import express from 'express';
import checkValidator from 'app/middlewares/checkValidator';
import { check } from 'express-validator/check';
import { User } from 'app/models';

const router = express.Router();

// register
router.put(
  '/:id',
  [
    check('password').optional(),
    check('birthday').optional(),
    check('deptname').optional(),
    check('phone').optional(),
    check('adl1').optional(),
    check('adl2').optional(),
    check('adl3').optional(),
    check('address').optional(),
    check('sex').optional(),
    check('occupation').optional(),
    check('status').optional(),
    check('cust_status').optional(),
    check('note').optional(),
    check('facebook_id').optional(),
    check('google_id').optional(),
    check('avatar').optional(),
  ],
  checkValidator,
  async (req, res, next) => {
    try {
      const {
        password,
        birthday,
        deptname,
        phone,
        adl1,
        adl2,
        adl3,
        address,
        sex,
        occupation,
        status,
        cust_status,
        note,
        facebook_id,
        google_id,
        avatar,
      } = req.body;

      await User.update(
        {
          password,
          birthday,
          deptname,
          phone,
          adl1,
          adl2,
          adl3,
          address,
          sex,
          occupation,
          status,
          cust_status,
          note,
          facebook_id,
          google_id,
          avatar,
        },
        {
          where: {
            id: req.params.id,
          }
        }
      );

      res.json({
        message: req.t('USER_UPDATE_SUCCESSFULLY'),
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
      await User.update({ status: 1 }, { where: { id: data.user } });
      res.json({
        message: 'ok',
      });
    } catch (e) {
      next(e)
    }
  }
);

export default router;

