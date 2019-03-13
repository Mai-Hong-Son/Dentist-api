/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  var Model = sequelize.define('Adl1', {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      autoIncrement: false,
    },
    name: {
      type: DataTypes.STRING(30),
    },
    type: {
      type: DataTypes.STRING(20),
    }
  }, {
      tableName: 'urs_adl1s',
      timestamps: false,
      underscored: true,
    });

  Model.containsKey = function (id) {
    return Model.findOne({
      where: { id }
    }) != null;
  }

  return Model;
};
