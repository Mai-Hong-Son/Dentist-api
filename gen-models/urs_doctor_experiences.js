/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_doctor_experiences', {
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
    organization: {
      type: DataTypes.STRING(450),
      allowNull: false
    },
    position: {
      type: DataTypes.STRING(450),
      allowNull: false
    },
    achievements: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    from_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    to_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'urs_doctor_experiences'
  });
};
