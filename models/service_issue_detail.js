/* jshint indent: 2 */

const { SERVICE_ISSUE_DETAIL_IMAGE_URL } = process.env;

const DISPLAY_TYPE_LEAF = 1;
const DISPLAY_TYPE_LIST = 2;

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('ServiceIssueDetail', {
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    service_issue_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
    },
    image_datas: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    display_type: {
      type: DataTypes.INTEGER(4),
      defaultValue: DISPLAY_TYPE_LEAF,
    },
    updated_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
  }, {
      tableName: 'urs_service_issue_details',
      timestamps: true,
      underscored: true,

      getterMethods: {
        images() {
          try {
            return JSON.parse(this.image_datas) || []
          } catch (e) { }
          return [];
        },
        image_urls() {
          const images = this.images || [];
          return images.map(v => SERVICE_ISSUE_DETAIL_IMAGE_URL + '/' + v)
        },
      },
      setterMethods: {
        images(val) {
          try {
            this.setDataValue('image_datas', JSON.stringify(val));
          } catch (e) { }
        }
      },

      scopes: {
        clientapp: {
          where: {
            status: 1,
          },
          attributes: [
            'id',
            'title',
            'parent_id',
            'image_datas',
            'service_issue_id',
            'display_type',
          ]
        }
      }
    });

  Model.DISPLAY_TYPE_LIST = DISPLAY_TYPE_LIST;
  Model.DISPLAY_TYPE_LEAF = DISPLAY_TYPE_LEAF;

  Model.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    delete values.image_datas;

    return values;
  }

  Model.associate = function (models) {
    Model.belongsTo(models.Service, {
      as: 'service_issue',
      foreignKey: 'service_issue_id'
    });
  };

  Model.containsKey = async (id) => {
    const model = await Model.findOne({ where: { id } });
    if (model) {
      return true;
    }

    return false;
  }

  Model.parentable = async (parentId, id) => {
    if (!id) return false;
    if (parentId === id) return false;

    let parent = Model.findOne({
      where: {
        id: parentId
      }
    })

    // not exist !
    if (!parent) {
      return false;
    }

    do {
      // is root
      if (!parent.parent_id) {
        if (parent.id === id) {
          return false;
        }
        return true;
      }

      if (parent.parent_id === id) {
        return false;
      }

      // get grand parent
      parent = Model.findOne({
        where: {
          id: parent.parent_id
        }
      })
    } while (1);

    return true;
  }

  return Model;
};
