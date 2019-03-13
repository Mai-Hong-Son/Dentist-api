import Sequelize from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    'Service',
    {
      active: {
        type: DataTypes.INTEGER(1),
        defaultValue: 1,
      },
      z_order: {
        type: DataTypes.INTEGER(11),
        defaultValue: 0,
      },
      name: DataTypes.STRING(200),
    },
    {
      tableName: 'urs_services',
      underscored: true,
      timestamps: false,
    }
  );

  Model.associate = function (models) {
    Model.hasMany(models.ServiceIssue, {
      as: 'issues',
      foreignKey: 'service_id'
    });
  };

  Model.containsKey = async (id) => {
    const model = await Model.findOne({ where: { id } });
    if (model) {
      return true;
    }

    return false;
  }

  return Model;
};
