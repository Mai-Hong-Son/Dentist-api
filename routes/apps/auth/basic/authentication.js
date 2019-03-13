import express from 'express';
import checkValidator from 'app/middlewares/checkValidator';
import { check } from 'express-validator/check';
import { authenticate } from 'app/authenticates/basic';

const router = express.Router();

// login
router.post(
  '/basic',
  [
    check('username')
      .not()
      .isEmpty()
      .withMessage(() => 'USERNAME_IS_NOT_EMPTY'),
    check('password')
      .not()
      .isEmpty()
      .withMessage(() => 'PASSWORD_IS_NOT_EMPTY')
  ],
  checkValidator,
  authenticate
);

export default router;