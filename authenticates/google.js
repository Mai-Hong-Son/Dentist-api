import { OAuth2Strategy } from 'passport-google-oauth';
import passport from "passport";
import uuid from 'uuid';
import { User } from '../models';

export const STRATEGY_NAME = 'google';

export default new OAuth2Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    if (profile) {
      const { emails } = profile;
      const defaults = {
        google_id: profile.id,
        fullname: profile.displayName,
        email: emails.length > 0 ? profile.emails[0].value : profile.id + '.fb@ursmiles.sg',
        password_hash: uuid.v4(),
        username: profile.id + "@google",
      };
  
      User.findOrCreate({
        where: {
          google_id: profile.id
        },
        defaults
      }).spread((user, created) => {
        // create from profile
        done(null, user);
      });
      return;
    }

    done();
  }
);

export const authenticate = (req, res, next) =>
  passport.authenticate(
    STRATEGY_NAME,
    { scope: ['profile', 'email'] }
  )(req, res, next);

export const callback = passport.authenticate(STRATEGY_NAME
  // , { failureRedirect: '/login' }
  , {
    session: false
  }
);