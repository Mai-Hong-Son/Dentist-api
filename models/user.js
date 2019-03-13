
import { encryption, validate } from 'app/utils/security';

import jwt from 'jsonwebtoken';
import uuid from 'uuid';
import { redisSet, redisGet, redisExpired, redisDelete } from 'app/redis';

const {
  CUSTOMER_GROUP_ID,
  USER_AVATAR_URL,
  TOKEN_SECRET_KEY
} = process.env;

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    'User',
    {
      username: DataTypes.STRING(50),
      fullname: DataTypes.STRING(200),
      password_hash: DataTypes.STRING(100),
      birthday: DataTypes.DATEONLY,
      email: DataTypes.STRING(100),
      deptname: DataTypes.STRING(200),
      last_change_password: DataTypes.DATE,
      group_id: {
        type: DataTypes.INTEGER(11),
        defaultValue: CUSTOMER_GROUP_ID
      },
      phone: DataTypes.STRING(100),
      position: DataTypes.STRING(100),
      adl1: DataTypes.STRING(5),
      adl2: DataTypes.STRING(5),
      adl3: DataTypes.STRING(5),
      address: DataTypes.STRING(500),
      sex: DataTypes.INTEGER(3),
      occupation: DataTypes.STRING(100),
      status: {
        type: DataTypes.INTEGER(3),
        defaultValue: 0,
      },
      note: DataTypes.STRING(1000),
      facebook_id: DataTypes.STRING(100),
      google_id: DataTypes.STRING(100),
      avatar: DataTypes.STRING(200),
      verified: DataTypes.INTEGER(1)
    },
    {
      tableName: 'sys_users',
      underscored: true,
      getterMethods: {
        // password: () => '',
        avatar_url() {
          if (this.avatar) {
            return USER_AVATAR_URL + '/' + this.avatar;
          }

          return 'https://dummyimage.com/100x100/f2a979/757575.png&text=' + (this.username || 'A').substr(0, 1);
        }
      },
      setterMethods: {
        password: function (v) {
          this.password_hash = encryption(v);
        }
      },
      scopes: {
        customer: {
          where: {
            group_id: CUSTOMER_GROUP_ID,
          }
        }
      }
    }
  );

  User.STATUS_ACTIVE = 1;
  User.STATUS_INACTIVE = 0;

  User.SEX_UNKNOWN = 0;
  User.SEX_MALE = 1;
  User.SEX_FEMALE = 2;

  User.CUSTOMER_GROUP_ID = CUSTOMER_GROUP_ID;

  User.existUsername = async (username, ignoreId = null) => {
    const user = await User.findOne({
      where: {
        username,
      }
    });

    // has ignoreId
    if (ignoreId) {
      if (user && ignoreId == user.id) {
        return false;
      }

      if (user && ignoreId !== user.id) {
        return true;
      }

      return false;
    }




    if (user) {
      return true;
    }

    return false;
  }

  User.existEmail = async (email, ignoreId = null) => {
    const user = await User.findOne({
      where: {
        email,
      },
    })

    // has ignoreId
    if (ignoreId) {
      if (user && ignoreId == user.id) {
        return false;
      }

      if (user && ignoreId !== user.id) {
        return true;
      }

      return false;
    }




    if (user) {
      return true;
    }

    return false;
  }

  User.findByAccessToken = async token => {
    const payload = jwt.verify(token, TOKEN_SECRET_KEY);
    if (payload.sub) {
      const user = await User.findOne({
        where: {
          id: payload.sub
        }
      });

      return user;
    }

    return null;
  };

  User.findByRefreshToken = async token => {
    const id = await redisGet(
      process.env.REDIS_REFRESH_TOKEN_PREFIX + '$' + token
    );

    if (id) {
      const user = await User.findOne({ where: { id } });
      if (user) {
        return user;
      }
    }

    throw new Error('Invalid token');
  };

  User.associate = function (models) {
    // associations can be defined here
  };

  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());

    delete values.password_hash;
    delete values.avatar;

    return values;
  };

  User.prototype.validatePassword = function (password) {
    return validate(password, this.password_hash);
  };

  User.prototype.generateAccessToken = async function () {
    return jwt.sign(
      {
        sub: this.id
      },
      TOKEN_SECRET_KEY,
      {
        expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRED)
      }
    );
  };

  User.prototype.generateRefreshToken = async function () {
    const token = uuid.v4();

    const redisKey = process.env.REDIS_REFRESH_TOKEN_PREFIX + '$' + token;
    try {
      await redisSet(redisKey, this.id);
      await redisExpired(redisKey, process.env.REDIS_REFRESH_TOKEN_EXPIRED);
    } catch (e) {
      console.log(e);
    }

    return token;
  };

  User.revokeRefreshToken = async function (token) {
    const redisKey = process.env.REDIS_REFRESH_TOKEN_PREFIX + '$' + token;
    try {
      await redisDelete(redisKey);
      return true;
    } catch (e) {
      console.log(e);
    }

    return false;
  }

  User.prototype.generateTokens = async function (old_refresh_token = null) {

    const result = {
      access_token: await this.generateAccessToken(),
      refresh_token: await this.generateRefreshToken()
    }


    // revoke refresh_token
    if (old_refresh_token) {
      await User.revokeRefreshToken(old_refresh_token);
    }

    return result
  };

  return User;
};
