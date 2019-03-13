/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_transactions', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    master_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    acct_type: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    trans_type: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    trans_amount: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    trans_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    trans_note: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    updated_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'urs_transactions'
  });
};
