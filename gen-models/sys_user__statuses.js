/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sys_user__statuses', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    label: {
      type: DataTypes.STRING(80),
      allowNull: false
    }
  }, {
    tableName: 'sys_user__statuses'
  });
};
