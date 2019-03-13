/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_campaigns', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image_url: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    image_href: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    cities: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    districts: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    wards: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    last_modified: {
      type: DataTypes.DATE,
      allowNull: true
    },
    modified_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'urs_campaigns'
  });
};
