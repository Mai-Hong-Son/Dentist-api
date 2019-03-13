
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('AppMenu', {
    parent_id: {
      type: DataTypes.INTEGER,
    },
    icon: {
      type: DataTypes.STRING(200),
    },
    alias: {
      type: DataTypes.STRING(100),
    },
    title_res_id: {
      type: DataTypes.INTEGER,
    },
    z_order: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.INTEGER(4),
    },
    note: {
      type: DataTypes.TEXT,
    }
  }, {
      tableName: 'urs_app_menus',
      timestamps: false,
      underscored: true,
    });

  Model.prototype.children = async function (status = 1) {
    if (status == undefined) {
      return Model.findAll({
        where: {
          parent_id: {
            $eq: this.id,
          },
        },
        order: [
          ['z_order', 'ASC'],
        ],
        attributes: [
          'id',
          'parent_id',
          'icon',
          'alias',
          'title_res_id',
        ]
      })
    }

    return Model.findAll({
      where: {
        parent_id: {
          $eq: this.id,
        },
        status,
      },
      order: [
        ['z_order', 'ASC'],
      ],
      attributes: [
        'id',
        'parent_id',
        'icon',
        'alias',
        'title_res_id',
      ]
    })
  }

  Model.tree = function () {

    const fetchChildren = children => Promise.all(children.map(item => fetchChild(item)))

    const fetchChild = async item => {
      const children = await item.children();
      const nestedChildren = await fetchChildren(children);
      if (nestedChildren.length) {
        const json = item.toJSON();
        return {
          ...json,
          children: nestedChildren,
        }
      }

      return item;
    }

    return Model.findAll({
      where: {
        parent_id: {
          $eq: 0
        },
        status: 1
      },
      order: [
        ['z_order', 'ASC']
      ],
      attributes: [
        'id',
        'parent_id',
        'icon',
        'alias',
        'title_res_id',
        // 'note',
        // 'z_order',
        // 'status'
      ]
    }).then(items => Promise.all(items.map(
      item => fetchChild(item)
    )))
  };

  return Model;
}