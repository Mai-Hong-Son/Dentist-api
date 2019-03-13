/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sys_configs', {
    key: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    tableName: 'sys_configs'
  });
};
