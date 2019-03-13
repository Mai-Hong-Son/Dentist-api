/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_adl2s', {
    id: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    adl1_id: {
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
    tableName: 'urs_adl2s'
  });
};
