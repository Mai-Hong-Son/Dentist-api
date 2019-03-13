/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_file_uploads', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    upload_type: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    file_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true
    },
    file_name: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    file_url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    uploaded_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'urs_file_uploads'
  });
};
