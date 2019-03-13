/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sys_functions', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    parent_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    link: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    children: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    tableName: 'sys_functions'
  });
};
