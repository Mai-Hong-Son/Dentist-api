/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sys_group_functions', {
    group_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    function_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    children: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    tableName: 'sys_group_functions'
  });
};
