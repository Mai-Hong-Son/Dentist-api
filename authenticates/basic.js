import passport from "passport";
import { Strategy } from "passport-local";
import createError from "http-errors";

import { validate, generateAccessToken } from "../utils/security";
import { Customer } from "../models";

export default new Strategy((username, password, done) => {
  (async () => {
    const user = await Customer.findOne({
      where: {
        username,
      }
    });

    if (!user) {
      return { data: null, validators: { username: "INCORRECT_USERNAME" } };
    }

    // validate
    if (user.validatePassword(password)) {
      return { data: user };
    }

    return { data: null, validators: { password: "INCORRECT_PASSWORD" } };
  })()
    .then(({ data, validators }) => done(null, data, validators))
    .catch(err => done(err));
});

export const authenticate = (req, res, next) =>
  passport.authenticate(
    "local",
    {
      session: false,
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    (error, user, validators) => {
      if (validators) {
        // translate validators
        for (let key in validators) {
          validators[key] = req.t(validators[key])
        }

        throw {
          message: "Validation failed",
          mapped: () => validators
        };
      }

      if (error) return next(error);

      user
        .generateTokens()
        .then(result => res.json(result))
        .catch(next);
    }
  )(req, res, next);
