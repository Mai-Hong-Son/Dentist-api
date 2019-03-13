/* jshint indent: 2 */


module.exports = function (sequelize, DataTypes) {
  var Model = sequelize.define('GroupPermission', {
    group_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    permission_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      primaryKey: true,
    },
  }, {
      tableName: 'sys_group_permissions',
      timestamps: false,
      underscored: true,
    });

  Model.associate = (models) => {
    models.Permission.hasMany(models.GroupPermission);
    models.GroupPermission.belongsTo(models.Permission);

  };

  return Model;
};
