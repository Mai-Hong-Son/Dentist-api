import Sequelize from 'sequelize';
import _ from 'lodash';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    'Permission',
    {
      name: DataTypes.STRING(200),
      description: DataTypes.STRING(200),
      code: DataTypes.STRING(100),

      parent_id: {
        type: Sequelize.INTEGER,
      },
    },
    {
      tableName: 'sys_permissions',
      underscored: true,
      timestamps: false,
    }
  );

  Model.isUnique = async (val, ignore = null) => {
    const item = await Model.findOne({
      where: {
        id: val,
      }
    })

    if (item) {
      if (item.id == ignore) {
        return true
      }

      return false;
    }

    return true;
  }

  Model.associate = (models) => {
  };


  Model.isExist = async (id) => {
    const model = Model.findOne({
      where: { id },
    });
    if (model) {
      if (model.id === id) {
        return true;
      }
    }

    return false;
  }


  // load all getDescendentsByGroupId, cached to redis
  Model.getDescendentsByGroupId = async (group_id) => {
    // load permissions
    const items = {};

    const permissions = await sequelize.query('select permission_id from sys_group_permissions where group_id=:group_id',
      { replacements: { group_id }, type: sequelize.QueryTypes.SELECT });

    // get all descendents
    const extractDescendents = async (permission) => {
      if (items[permission.id]) {
        return;
      }

      items[permission.id] = permission;

      let children = await Model.findAll({
        where: {
          parent_id: permission.id,
        }
      });

      for (let child of children) {
        extractDescendents(child);
      }
    }


    for (let data of permissions) {

      let permission = await Model.findOne({
        where: {
          id: data.permission_id
        }
      });

      await extractDescendents(permission);
    }

    return items;
  }

  Model.allow = async (user, code) => {
    if (!user) return false;

    // get code by id
    const data = await Model.findOne({ where: { code } });

    if (data) {
      const permissions = await Model.getDescendentsByGroupId(user.group_id);

      if (permissions[data.id]) {
        return true;
      }
    }



    return false;
  }

  return Model;
};
