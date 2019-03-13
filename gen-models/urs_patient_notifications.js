/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_patient_notifications', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    master_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    created_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    },
    last_modified: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    },
    content_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    noti_body: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    noti_title: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'urs_patient_notifications'
  });
};
