
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    'XRayLocationWorkTime',
    {
      x_ray_location_id: {
        type: DataTypes.INTEGER(11),
      },
      day_of_week: {
        type: DataTypes.INTEGER(1),
      },
      start_at: {
        type: DataTypes.TIME,
      },
      end_at: {
        type: DataTypes.TIME,
      }
    },
    {
      tableName: 'urs_x_ray_location_worktimes',
      underscored: true,
      timestamps: false,
    });

  Model.associate = function (models) {
    Model.belongsTo(models.XRayLocation, { as: 'city', foreignKey: 'adl1' })
  };


  return Model
}