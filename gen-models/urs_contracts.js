/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_contracts', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ct_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ct_code: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ct_title: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    ct_side_a: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    ct_side_b: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    ct_side_c: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    ct_note: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    ct_status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    img_list: {
      type: DataTypes.STRING(3000),
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_by: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'urs_contracts'
  });
};
