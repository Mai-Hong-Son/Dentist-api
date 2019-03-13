/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_campaign_vs_users', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    camp_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    master_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'urs_campaign_vs_users'
  });
};
