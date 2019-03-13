import express from 'express';
import { check } from 'express-validator/check';
import checkValidator from 'app/middlewares/checkValidator';
import { nextCatch, throwIfNull } from 'app/utils';
import { User } from 'app/models';
import uuid from 'uuid';
import fs from 'fs';
import { resizeImage } from './common';
import { authenticate } from 'app/authenticates/auth';

const { USER_AVATAR_LOCATION } = process.env

const router = express.Router();

router.put('/:id', authenticate, [
  check('id').isInt(),

  check('username').not().isEmpty()
    .not()
    .custom((val, { req }) => User.existUsername(val, req.params.id))
    .withMessage((val, { req }) => req.t('CUSTOMER_USERNAME_MUST_BE_REQUIRED')),

  check('password').not().isEmpty()
  .withMessage((val, { req }) => req.t('CUSTOMER_PASSWORD_MUST_BE_REQURIED')),

  check('fullname').not().isEmpty()
    .withMessage((val, { req }) => req.t('CUSTOMER_FULLNAME_MUST_BE_REQUIRED')),

  check('birthday')
    .optional()
    .custom((val) => isDate(val))
    .withMessage((val, { req }) => req.t('CUSTOMER_BIRTHDAY_INVALID_FORMAT')),

  check('email').not().isEmpty()
    .withMessage((val, { req }) => req.t('CUSTOMER_EMAIL_MUST_BE_REQUIRED'))
    .not()
    .custom((val, { req }) => User.existEmail(val, req.params.id))
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
    User.SEX_UNKNOWN,
    User.SEX_MALE,
    User.SEX_FEMALE,
  ]).withMessage((val, { req }) => req.t('CUSTOMER_SEX_INVALID')),

  check('occupation')
    .optional(),

  check('status')
    .isIn([
      User.STATUS_ACTIVATE,
      User.STATUS_INACTIVE,
    ]),

  check('note').optional(),
], checkValidator, nextCatch(async (req, res, next) => {
  const model = throwIfNull(await User.scope('customer').findOne({
    where: { id: req.params.id }
  }))

  let oldAvatar = model.avatar
  let newAvatar = null;
  if (req.files && req.files.avatar) {
    newAvatar = req.files.avatar;
  }

  const {
    username,
    fullname,
    birthday,
    email,
    phone,
    position,
    adl1,
    adl2,
    adl3,
    address,
    sex,
    occupation,
    status,
    note,
  } = req.body

  const data = {
    username,
    fullname,
    birthday,
    email,
    phone,
    position,
    adl1,
    adl2,
    adl3,
    address,
    sex,
    occupation,
    status,
    note,
  }

  if (newAvatar) {
    const uniqueName = uuid.v4() + '.png';

    await resizeImage(newAvatar.data).toFile(USER_AVATAR_LOCATION + '/' + uniqueName);

    data.avatar = uniqueName;
  }

  await model.updateAttributes(data)

  // remove old avatar
  if (newAvatar) {
    fs.unlink(USER_AVATAR_LOCATION + '/' + oldAvatar, () => { })
  }

  res.json(model)
}))

export default router;