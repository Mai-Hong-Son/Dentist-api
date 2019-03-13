
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    'DoctorExperience',
    {
      master_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      organization: {
        type: DataTypes.STRING(450)
      },
      position: {
        type: DataTypes.STRING(450),
      },
      achievements: {
        type: DataTypes.TEXT,
      },

      from_date: {
        type: DataTypes.DATE,
      },
      to_date: {
        type: DataTypes.DATE,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'urs_doctors',
      underscored: true,
    }
  );

  Model.associate = models => {
    Model.belongsTo(models.Doctor, { as: 'master', foreignKey: 'master_id' });
  }

  return Model;
};
