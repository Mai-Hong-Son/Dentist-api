/* jshint indent: 2 */


module.exports = function (sequelize, DataTypes) {
  var Config = sequelize.define('Config', {
    key: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
      tableName: 'sys_configs',
      timestamps: false,
    });

  Config.get = async (key, defaultValue = null) => {
    const c = await Config.findOne({
      where: {
        key,
      },
    });

    if (c) {
      return c.value;
    }
    
    return defaultValue;
  };

  Config.set = (key, value) => Config.upsert({
    key,
    value: JSON.stringify(value),
  });


  return Config;
};
