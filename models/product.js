import Sequelize from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define(
    'Product',
    {
      service_id: {
        type: DataTypes.INTEGER(11)
      }
    },
    {
      tableName: 'urs_products',
      underscored: true,
    }
  );

  return Product;
};
