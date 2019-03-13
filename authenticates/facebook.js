import passport from "passport";
import request from "request";
import CustomStrategy from "passport-custom";
import qs from "querystring";
import uuid from "uuid";
import { User } from "../models";

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
const STRATEGY_NAME = 'facebook';

const FacebookStrategy = new CustomStrategy((req, callback) => {
  const authData = (req.headers.authorization || "").split(" ");
  if (authData.length < 2) {
    return callback(null, false, { token: req.t('INVALID_TOKEN') });
  }

  if (authData[0] != "Facebook") {
    return callback(null, false, { token: req.t('INVALID_TOKEN') });
  }

  const path =
    "https://graph.facebook.com/me?" +
    qs.stringify({
      fields: ["id", "name", "email"].join(","),
      access_token: authData[1]
    });

  request(path, (error, response, body) => {
    if (
      !error &&
      response &&
      response.statusCode &&
      response.statusCode == 200
    ) {
      try {
        const profile = JSON.parse(body);

        User.findOrCreate({
          where: {
            facebook_id: profile.id
          },
          defaults: {
            facebook_id: profile.id,
            email: profile.email,
            password_hash: uuid.v4(),
            fullname: profile.name,
            username: profile.id + "@fb"
          }
        }).spread((user, created) => {
          // create from profile
          callback(null, user);
        });
      } catch (e) {
        callback(e, false);
      }

      return;
    }

    callback(null, false, { token: req.t('INVALID_TOKEN') });
  });
});

FacebookStrategy.name = STRATEGY_NAME

export default FacebookStrategy;

export const authenticate = (req, res, next) =>
  passport.authenticate(STRATEGY_NAME, (error, user, validators) => {
    if (error) return next(error);

    if (validators) return res.status(400).json(validators);

    user
      .generateTokens()
      .then(result => res.json(result))
      .catch(next);
  })(req, res, next);
