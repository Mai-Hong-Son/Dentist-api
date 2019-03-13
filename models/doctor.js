
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    'Doctor',
    {
      master_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(200)
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      managed_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      note: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: 'urs_doctors',
      underscored: true,
    }
  );

  Model.associate = models => {
    Model.belongsTo(models.User, { as: 'master', foreignKey: 'master_id' });
    Model.belongsTo(models.User, { as: 'manager', foreignKey: 'managed_by' });
  }

  return Model;
};
