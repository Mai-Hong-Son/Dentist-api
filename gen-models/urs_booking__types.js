/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_booking__types', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    text_res_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    text: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'urs_booking__types'
  });
};
