/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_doctors', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.STRING(3000),
      allowNull: true
    },
    room: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    note: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    sys_username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    managed_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_by: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    last_modified: {
      type: DataTypes.DATE,
      allowNull: true
    },
    modified_by: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'urs_doctors'
  });
};
