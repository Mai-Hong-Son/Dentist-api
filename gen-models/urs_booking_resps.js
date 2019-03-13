/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urs_booking_resps', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    booking_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    datetime_selected: {
      type: DataTypes.DATE,
      allowNull: false
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_by: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'urs_booking_resps'
  });
};
