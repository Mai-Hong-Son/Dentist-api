

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    'XRayLocation',
    {
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
      },
      adl1: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      pricing: {
        type: DataTypes.DECIMAL({ precision: 20, scale: 6 }),
        defaultValue: 0,
      },
    }, {
      tableName: 'urs_x_ray_locations',
      underscored: true,
      timestamps: false,
    });

  Model.associate = function (models) {
    Model.belongsTo(models.Adl1, { as: 'city', foreignKey: 'adl1' })
  };

  return Model
}