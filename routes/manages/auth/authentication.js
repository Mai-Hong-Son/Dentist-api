import express from 'express';
import checkValidator from 'app/middlewares/checkValidator';
import { check } from 'express-validator/check';
import { authenticate } from 'app/authenticates/manage';

const router = express.Router();

router.post('/basic',
  [
    check('username')
      .not()
      .isEmpty()
      .withMessage(() => 'USERNAME_IS_REQUIRED'),
    check('password')
      .not()
      .isEmpty()
      .withMessage(() => 'PASSWORD_IS_REQUIRED')
  ],
  checkValidator,
  authenticate
);

export default router;