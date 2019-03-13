/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('ServiceIssue', {
    title: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    service_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    }
  }, {
      tableName: 'urs_service_issues',
      timestamps: true,
      underscored: true,

      getterMethods: {
        image_url() {
          return process.env.SERVICE_ISSUE_IMAGE_URL + '/' + this.image
        }
      }
    });

  Model.associate = function (models) {
    Model.belongsTo(models.Service, {
      as: 'service',
      foreignKey: 'service_id'
    });
  };

  Model.containsKey = async (id) => {
    const model = await Model.findOne({ where: { id } });
    if (model) {
      return true;
    }

    return false;
  }

  return Model;
};
