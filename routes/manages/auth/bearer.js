import express from 'express';
import { authenticate } from 'app/authenticates/auth';
import { nextCatch } from 'app/utils';
import checkValidator from 'app/middlewares/checkValidator';
import { check } from 'express-validator/check';
import { User } from 'app/models';

const router = express.Router();

/**
 * get current user
 */
router.get('/me', authenticate, (req, res, next) => {
  res.json(req.user);
});

router.post('/me',
  authenticate,
  [
    check('fullname').not().isEmpty()
      .withMessage((val, { req }) => req.t('CUSTOMER_FULLNAME_MUST_BE_REQUIRED')),

    check('birthday')
      .optional()
      .custom((val) => isDate(val))
      .withMessage((val, { req }) => req.t('CUSTOMER_BIRTHDAY_INVALID_FORMAT')),

    check('email').not().isEmpty()
      .withMessage((val, { req }) => req.t('CUSTOMER_EMAIL_MUST_BE_REQUIRED'))
      .not()
      .custom((val, { req }) => User.existEmail(val, req.user.id))
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

  ],
  checkValidator,
  nextCatch(async (req, res, next) => {
    const user = req.user

    const {
      fullname,
      email,
      phone,
      address,
      sex,
      occupation,
      adl1,
      adl2,
      adl3,
    } = req.body

    await user.updateAttributes({
      fullname,
      email,
      phone,
      address,
      sex,
      occupation,
      adl1,
      adl2,
      adl3,
    })

    res.json(user)
  }));

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
  nextCatch(async (req, res, next) => {
    const { refresh_token } = req.body;
    await User.revokeRefreshToken(refresh_token);
    res.json({ message: req.t('LOGOUT_SUCCESSFULLY') });
  })
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
  nextCatch(async (req, res, next) => {
    const { refresh_token } = req.body;
    const user = await User.findByRefreshToken(refresh_token);
    return res.json(await user.generateTokens(refresh_token));
  })
);



export default router;


// express + passport + sequelize + redis