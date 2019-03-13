/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sys_text_resources', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    language: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    source: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    translation: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'sys_text_resources'
  });
};
