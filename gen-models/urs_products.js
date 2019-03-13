/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_products', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    service_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    product_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    product_description: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    total_payment: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    discount_amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '0'
    },
    is_promoting: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      defaultValue: '0'
    },
    open_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    expire_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    doctor_amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      defaultValue: '1'
    },
    img_url: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'urs_products'
  });
};
