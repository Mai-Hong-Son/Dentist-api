/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_notifications', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    group_id: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    master_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    patient_username: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    notice_content: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    notice_url: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'urs_notifications'
  });
};
