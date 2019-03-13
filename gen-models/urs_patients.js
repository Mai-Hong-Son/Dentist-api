/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_patients', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    master_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(3),
      allowNull: true,
      defaultValue: '1'
    },
    become_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    medical_record_status: {
      type: DataTypes.INTEGER(3),
      allowNull: true,
      defaultValue: '0'
    },
    managed_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'urs_patients'
  });
};
