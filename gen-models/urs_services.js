/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_services', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    res_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    category: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    z_order: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    tableName: 'urs_services'
  });
};
