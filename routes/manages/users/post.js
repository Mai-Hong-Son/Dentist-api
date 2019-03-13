import express from 'express';
import { check } from 'express-validator/check';
import { isDate, nextCatch } from 'app/utils';
import checkValidator from 'app/middlewares/checkValidator';
import { User, Adl1, Adl2, Adl3 } from 'app/models';
import uuid from 'uuid';
import { resizeImage } from './common';
import { authenticate } from 'app/authenticates/auth';

const { USER_AVATAR_LOCATION } = process.env

const router = express.Router();

router.post('/', authenticate,
  [
    check('username').not().isEmpty()
      .withMessage((val, { req }) => req.t('USER_USERNAME_MUST_BE_REQUIRED'))
      .not()
      .custom((val) => User.existUsername(val))
      .withMessage((val, { req }) => req.t('USER_USERNAME_MUST_BE_UNIQUE')),

    check('password').not().isEmpty()
      .withMessage((val, { req }) => req.t('USER_PASSWORD_MUST_BE_REQUIRED')),

    check('group_id').not().isEmpty()
      .withMessage((val, { req }) => req.t('USER_GROUP_ID_MUST_BE_REQUIRED')),

    check('fullname').not().isEmpty()
      .withMessage((val, { req }) => req.t('USER_FULLNAME_MUST_BE_REQUIRED')),

    check('birthday')
      .optional()
      .custom((val) => isDate(val))
      .withMessage((val, { req }) => req.t('USER_BIRTHDAY_INVALID_FORMAT')),

    check('email').not().isEmpty()
      .withMessage((val, { req }) => req.t('USER_EMAIL_MUST_BE_REQUIRED'))
      .not()
      .custom((val, { req }) => User.existEmail(val))
      .withMessage((val, { req }) => req.t('USER_EMAIL_MUST_BE_UNIQUE')),

    check('phone').optional(),

    check('adl1').optional()
      .custom((val, { req }) => Adl1.containsKey(val))
      .withMessage((val, { req }) => req.t('USER_ADL1_INVALID')),

    check('adl2').optional()
      .custom((val, { req }) => Adl2.containsKey(val))
      .withMessage((val, { req }) => req.t('USER_ADL2_INVALID')),

    check('adl3').optional()
      .custom((val, { req }) => Adl3.containsKey(val))
      .withMessage((val, { req }) => req.t('USER_ADL3_INVALID')),

    check('address').optional(),

    check('sex').isIn([
      User.SEX_UNKNOWN,
      User.SEX_MALE,
      User.SEX_FEMALE,
    ]).withMessage((val, { req }) => req.t('USER_SEX_INVALID')),

    check('occupation')
      .optional(),

    check('status')
      .isIn([
        User.STATUS_ACTIVATE,
        User.STATUS_INACTIVE,
      ]),

    check('note').optional(),

  ],
  checkValidator,
  nextCatch(async (req, res, next) => {
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
      group_id
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
      group_id
    }

    if (uniqueName) {
      data.avatar = uniqueName;
    }

    const model = await User.create(data);

    res.json(model);
  }));

export default router;