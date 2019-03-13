import express from 'express';
import { check } from 'express-validator/check';
import checkValidator from 'app/middlewares/checkValidator';
import { User } from 'app/models';
import uuid from 'uuid';
import { composeMail } from 'app/mail';

const router = express.Router();

// forgot
router.post(
  '/forgot-password',
  [
    check('email', 'EMAIL_IS_NOT_EMPTY')
      .not()
      .isEmpty()
      .withMessage(() => 'EMAIL_IS_NOT_EMPTY'),

    check('email')
      .isEmail()
      .withMessage(() => 'EMAIL_IS_NOT_VALID')
  ],
  checkValidator,
  async (req, res, next) => {
    try {
      const { email } = req.body;

      const password = uuid.v4().substring(0, 6);

      await User.update(
        {
          password,
          last_change_password: Date.now(),
        },
        { where: { email } }
      );

      const mailConfiguration = {
        subject: req.t('EMAIL_RESET_PASSWORD_SUBJECT'),
        template: 'views/forgotPassword.ejs',
        destination: email,
        data: {
          email,
          password
        }
      }
      composeMail(mailConfiguration);

      res.json({
        message: 'ok'
      });

    } catch (err) {
      return next(err)
    }
  }
);

export default router;