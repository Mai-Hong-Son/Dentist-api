/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_rmd_patient_debit', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    master_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    debit: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    end_period: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    },
    send_count: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    send_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'urs_rmd_patient_debit'
  });
};
