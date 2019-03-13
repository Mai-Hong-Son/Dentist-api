/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_questions', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    service_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    target_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    files_uploading: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tmp_phone: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    tmp_email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    updated_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    service_issue_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'urs_questions'
  });
};
