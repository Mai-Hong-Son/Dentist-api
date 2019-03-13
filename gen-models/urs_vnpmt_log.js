/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_vnpmt_log', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    processing_id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    payment_transno: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    payment_amount: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    payment_info: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    payment_message_sender: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    payment_message_receiver: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    issue_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'urs_vnpmt_log'
  });
};
