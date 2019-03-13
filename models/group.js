import Sequelize from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    'Group',
    {
      name: DataTypes.STRING(80),
    },
    {
      tableName: 'sys_groups',
      underscored: true,
      timestamps: false,
    }
  );

  Model.associate = (models) => {
    
  };

  return Model;
};
