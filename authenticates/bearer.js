import { Strategy } from 'passport-http-bearer';
import passport from 'passport';
import { Customer } from '../models';

const STRATEGY_NAME = 'bearer';

export default new Strategy(function (token, cb) {
  (async () => {
    const user = await Customer.findByAccessToken(token);
    return user ? user : false;
  })()
    .then(user => cb(null, user))
    .catch(err => cb(err));
});

export const authenticate = (req, res, next) => {
  passport.authenticate(STRATEGY_NAME, (err, user, info) => {
    if (err) return next(err);

    if (user) {
      req.user = user;
      return next();
    }

    return res.status(401).json({ status: 'error', code: 'unauthorized' });
  })(req, res, next);
};

// remove refresh token
export const revokeRefreshToken = async (req, res, next) => {
  try {
    const token = req.body.refresh_token || '';
    if (token.length === 0) {
      throw new Error(req.t('INVALID_TOKEN'));
    }
    await Customer.revokeRefreshToken(token);
    res.json({ message: req.t('LOGOUT_SUCCESSFULY') });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: req.t('INVALID_TOKEN'),
    });
    return next(error)
  }
};

// regenerate token
export const refreshAccessToken = async (req, res, next) => {
  try {
    const token = req.body.refresh_token || '';
    if (token.length === 0) {
      throw new Error(req.t('INVALID_TOKEN'));
    }
    const user = await Customer.findByRefreshToken(token);
    res.json(await user.generateTokens(token));
    
  } catch (error) {
    console.log(error)

    res.status(400).json({
      message: req.t('INVALID_TOKEN'),
    });
    return next(error)
  }
};
