import express from 'express';
import { check } from 'express-validator/check';
import { isDate, nextCatch } from 'app/utils';
import checkValidator from 'app/middlewares/checkValidator';
import { Customer, Adl1, Adl2, Adl3 } from 'app/models';
import uuid from 'uuid';
import { resizeImage } from './common';
import { authenticate } from 'app/authenticates/auth';

const { USER_AVATAR_LOCATION } = process.env

const router = express.Router();

router.post('/', authenticate,
  [
    check('username').not().isEmpty()
      .withMessage((val, { req }) => req.t('CUSTOMER_USERNAME_MUST_BE_REQUIRED'))
      .not()
      .custom((val) => Customer.existUsername(val))
      .withMessage((val, { req }) => req.t('CUSTOMER_USERNAME_MUST_BE_UNIQUE')),

    check('password').not().isEmpty()
    .withMessage((val, { req }) => req.t('CUSTOMER_PASSWORD_MUST_BE_REQUIRED')),

    check('fullname').not().isEmpty()
      .withMessage((val, { req }) => req.t('CUSTOMER_FULLNAME_MUST_BE_REQUIRED')),

    check('birthday')
      .optional()
      .custom((val) => isDate(val))
      .withMessage((val, { req }) => req.t('CUSTOMER_BIRTHDAY_INVALID_FORMAT')),

    check('email').not().isEmpty()
      .withMessage((val, { req }) => req.t('CUSTOMER_EMAIL_MUST_BE_REQUIRED'))
      .not()
      .custom((val, { req }) => Customer.existEmail(val))
      .withMessage((val, { req }) => req.t('CUSTOMER_EMAIL_MUST_BE_UNIQUE')),

    check('phone').optional(),

    check('adl1').optional()
      .custom((val, { req }) => Adl1.containsKey(val))
      .withMessage((val, { req }) => req.t('CUSTOMER_ADL1_INVALID')),

    check('adl2').optional()
      .custom((val, { req }) => Adl2.containsKey(val))
      .withMessage((val, { req }) => req.t('CUSTOMER_ADL2_INVALID')),

    check('adl3').optional()
      .custom((val, { req }) => Adl3.containsKey(val))
      .withMessage((val, { req }) => req.t('CUSTOMER_ADL3_INVALID')),

    check('address').optional(),

    check('sex').isIn([
      Customer.SEX_UNKNOWN,
      Customer.SEX_MALE,
      Customer.SEX_FEMALE,
    ]).withMessage((val, { req }) => req.t('CUSTOMER_SEX_INVALID')),

    check('occupation')
      .optional(),

    check('status')
      .isIn([
        Customer.STATUS_ACTIVATE,
        Customer.STATUS_INACTIVE,
      ]),

    check('note').optional(),

  ], checkValidator, nextCatch(async (req, res, next) => {

    const {
      username,
      fullname,
      password,
      birthday,
      email,
      phone,
      adl1,
      adl2,
      adl3,
      address,
      sex,
      occupation,
      status,
      note,
    } = req.body

    // upload avatar
    let uniqueName;
    if (req.files && req.files.avatar) {
      uniqueName = uuid.v4() + '.png';
      await resizeImage(req.files.avatar.data).toFile(USER_AVATAR_LOCATION + '/' + uniqueName)
    }

    const data = {
      username,
      fullname,
      password,
      birthday,
      email,
      phone,
      adl1,
      adl2,
      adl3,
      address,
      sex,
      occupation,
      status,
      note,
    }

    if (uniqueName) {
      data.avatar = uniqueName;
    }

    const model = await Customer.create(data)



    res.json(model);
  }));

export default router;