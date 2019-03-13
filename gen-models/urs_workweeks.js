/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_workweeks', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    doctor_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    date_of_week: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    start_hour: {
      type: DataTypes.TIME,
      allowNull: true
    },
    end_hour: {
      type: DataTypes.TIME,
      allowNull: true
    },
    apply_from: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    expired_to: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'urs_workweeks'
  });
};
