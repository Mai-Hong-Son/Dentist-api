/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_product_orders', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    contract_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    patient_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    apply_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    order_status: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      defaultValue: '1'
    },
    real_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0'
    },
    order_tracking: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      defaultValue: '0'
    },
    discount_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0'
    },
    doctor_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0'
    },
    doctor_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    note: {
      type: DataTypes.STRING(450),
      allowNull: true
    },
    related_order: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    updated_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'urs_product_orders'
  });
};
