import passport from "passport";
import CustomStrategy from "passport-custom";
import { User } from "../models";

export const STRATEGY_NAME = 'manage';

const ManageStrategy = new CustomStrategy((req, done) => {

  (async () => {
    const { username, password } = req.body
    
    const user = await User.findOne({
      where: {
        username,
      }
    });

    if (!user) {
      return { data: null, validators: { username: 'INVALID_USERNAME' } };
    }

    // validate
    if (user.validatePassword(password)) {
      return { data: user };
    }

    return { data: null, validators: { password: "INVALID_PASSWORD" } };
  })()
    .then(({ data, validators }) => done(null, data, validators))
    .catch(err => done(err));

});
ManageStrategy.name = STRATEGY_NAME;

export default ManageStrategy;

export const authenticate = (req, res, next) =>
  passport.authenticate(STRATEGY_NAME, (error, user, validators) => {
    (async () => {
      if (error) throw error;

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

      const tokens = user.generateTokens();
      return tokens;
    })()
      .then(result => res.json(result))
      .catch(next)

  })(req, res, next);
