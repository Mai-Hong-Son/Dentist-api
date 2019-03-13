// register flow

import express from 'express';
import jwt from 'jsonwebtoken';
import { check } from 'express-validator/check';
import checkValidator from 'app/middlewares/checkValidator';
import { Customer } from 'app/models';
import qs from 'querystring';
import { Promise } from 'core-js';
import { composeMail } from 'app/mail';

const router = express.Router();

// register
router.post(
  '/register',
  [
    check('username', 'USERNAME_IS_NOT_EMPTY')
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        return new Promise((resolve, reject) => {
          Customer.existUsername(value)
          .then(val => val ? reject() : resolve()).catch(resolve);
        })
      })
      .withMessage(() => 'USER_IS_EXISTS'),

    check('email', 'EMAIL_IS_NOT_EMPTY')
      .exists()
      .isEmail(),

    check('email', 'EMAIL_IS_EXISTS')
      .exists()
      .custom((value, { req }) => {
        return new Promise((resolve, reject) => {
          Customer.existEmail(value).then(val => val ? reject() : resolve()).catch(resolve);
        })
      })
      .withMessage(() => 'USER_IS_EXISTS'),

    check('fullname').optional(),
    check('address').optional(),

    check('password', 'PASSWORD_IS_NOT_EMPTY')
      .not()
      .isEmpty()
      .withMessage(() => 'PASSWORD_IS_NOT_EMPTY')
  ],
  checkValidator,
  async (req, res, next) => {
    try {
      const {
        email,
        password,
        username,
        fullname,
        address,
      } = req.body;

      const model = await Customer.create({
        email,
        username,
        password,
        fullname,
        address,
      });

      const confirmToken = jwt.sign(
        {
          user: model.id
        },
        process.env.ACTIVE_EMAIL_SECRET_KEY,
        {
          expiresIn: '2d',
        }
      )

      const url = process.env.BASE_URL + '/auth/active?' + qs.stringify({
        token: confirmToken,
      })

      const mailConfiguration = {
        subject: 'Email Verifying',
        template: 'views/verifyAccount.ejs',
        destination: email,
        data: {
          email,
          url
        }
      }
      composeMail(mailConfiguration);

      res.json({
        message: req.t('USER_REGISTER_SUCCESSFULLY'),
      })

    } catch (e) {
      next(e);
    }
  }
);

// active
router.get(
  '/active',
  [
    check('token')
      .not()
      .isEmpty()
      .withMessage('TOKEN_IS_NOT_EMPTY'),
  ],
  checkValidator,
  async (req, res, next) => {
    try {
      const { token } = req.query;
      const data = jwt.verify(token, process.env.ACTIVE_EMAIL_SECRET_KEY);
      await Customer.update({ status: 1 }, { where: { id: data.user } });
      res.json({
        message: 'ok',
      });
    } catch (e) {
      next(e)
    }
  }
);

export default router;

