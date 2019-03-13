/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_vnpmt_cfg', {
    service: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    value: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    tableName: 'urs_vnpmt_cfg'
  });
};
