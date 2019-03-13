/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_vnpmt_services', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    service_channel: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    service_code: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    service_desc: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: '1'
    },
    payurl: {
      type: DataTypes.STRING(2000),
      allowNull: true
    }
  }, {
    tableName: 'urs_vnpmt_services'
  });
};
