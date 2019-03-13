/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_adl3s', {
    id: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    adl2_id: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    tableName: 'urs_adl3s'
  });
};
