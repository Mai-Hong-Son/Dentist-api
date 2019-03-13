/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_adviser', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sys_username: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    created_by: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    modified_by: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    modified_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    note: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    tableName: 'urs_adviser'
  });
};
