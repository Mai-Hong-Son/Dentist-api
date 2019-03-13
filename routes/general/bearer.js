// ignore this file

import express from 'express';
import { check } from 'express-validator/check';
import checkValidator from 'app/middlewares/checkValidator';
import { User } from 'app/models';
import createError from 'http-errors';

const router = express.Router();

// logout
router.put(
  '/logout',
  [
    check('refresh_token')
      .not()
      .isEmpty()
      .withMessage(() => 'REFRESH_TOKEN_IS_REQUIRED')
  ],
  checkValidator,
  async (req, res, next) => {
    try {
      const { refresh_token } = req.body;

      await User.revokeRefreshToken(refresh_token);
      res.json({ message: req.t('LOGOUT_SUCCESSFULLY') });

    } catch (err) {
      return next(err)
    }
  }
);


// refresh token
router.post(
  '/refresh',
  [
    check('refresh_token')
      .not()
      .isEmpty()
      .withMessage(() => 'REFRESH_TOKEN_IS_REQUIRED')
  ],
  checkValidator,
  async (req, res, next) => {
    try {
      const { refresh_token } = req.body;
      const user = await User.findByRefreshToken(refresh_token);
      return res.json(await user.generateTokens(refresh_token));
    } catch (err) {
      console.log(err)
    }

    return next(createError(400, req.t('INVALID_TOKEN')))
  }
);

export default router;