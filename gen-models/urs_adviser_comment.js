/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_adviser_comment', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    adviser_username: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    treatment_history_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    created_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    last_modified: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'urs_adviser_comment'
  });
};
