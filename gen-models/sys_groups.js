/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sys_groups', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false
    }
  }, {
    tableName: 'sys_groups'
  });
};
