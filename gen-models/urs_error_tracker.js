/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_error_tracker', {
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
    client_type: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    error_type: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    screen: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    api_url: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'urs_error_tracker'
  });
};
