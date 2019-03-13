/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_doctor_assignment', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    adviser_username: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    doctor_username: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    assign_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'urs_doctor_assignment'
  });
};
