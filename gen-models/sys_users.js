/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sys_users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    fullname: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    password_hash: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: '1900-01-01'
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    deptname: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_change_password: {
      type: DataTypes.DATE,
      allowNull: true
    },
    group_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    position: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    adl1: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    adl2: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    adl3: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    sex: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: true
    },
    occupation: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: true
    },
    cust_status: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: '0'
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    note: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    facebook_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    facebook_access_token: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    google_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    google_access_token: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    verified: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'sys_users'
  });
};
