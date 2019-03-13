/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  var Model = sequelize.define('Adl3', {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      autoIncrement: false,
    },
    adl2_id: {
      type: DataTypes.STRING(5),
    },
    name: {
      type: DataTypes.STRING(30),
    },
    type: {
      type: DataTypes.STRING(20),
    }
  }, {
      tableName: 'urs_adl3s',
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
