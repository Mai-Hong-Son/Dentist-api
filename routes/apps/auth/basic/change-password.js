import express from 'express';
import { authenticate } from 'app/authenticates/bearer';
import { check } from 'express-validator/check';
import checkValidator from 'app/middlewares/checkValidator';
import { nextCatch } from 'app/utils';

const router = express.Router();

router.post('/change-password',
  authenticate,
  [
    check('old_password')
      .not().isEmpty().withMessage((val, { req }) => req.t('AUTH_CHANGE_OLD_PASSWORD_MUST_BE_REQUIRED'))
      .custom((val, { req }) => req.user.validatePassword(val))
      .withMessage((val, { req }) => req.t('AUTH_CHANGE_OLD_PASSWORD_INVALID')),

    check('new_password').not().isEmpty().withMessage((val, { req }) => req.t('AUTH_CHANGE_NEW_PASSWORD_MUST_BE_REQUIRED')),
  ],
  checkValidator,
  nextCatch(async (req, res, next) => {
    const { user } = req
    const { new_password } = req.body

    user.password = new_password
    await user.save();

    res.json(user)
  }));

export default router