/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_push_info', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(450),
      allowNull: false
    },
    os: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: 'web'
    },
    reg_id: {
      type: DataTypes.STRING(2500),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      defaultValue: '1'
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    device_id: {
      type: DataTypes.STRING(450),
      allowNull: true
    }
  }, {
    tableName: 'urs_push_info'
  });
};
