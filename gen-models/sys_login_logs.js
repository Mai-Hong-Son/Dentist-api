/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sys_login_logs', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    wrongpass: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    lockedtime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'sys_login_logs'
  });
};
