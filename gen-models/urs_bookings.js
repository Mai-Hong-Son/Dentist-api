/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_bookings', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    service_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    master_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    patient_username: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    booking_type: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    addr_city: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    addr_district: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    addr_ward: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    detail_addr: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    datetime_options: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    datetime_selected: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    tmp_phone: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    tmp_email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    modified_by: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    last_modified: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    note: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    tableName: 'urs_bookings'
  });
};
