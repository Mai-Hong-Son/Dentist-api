import express from 'express';
import checkValidator from 'app/middlewares/checkValidator';
import { nextCatch } from 'app/utils';
import { Answer, Question } from 'app/models';
import { authenticate } from 'app/authenticates/auth';
import { check } from 'express-validator/check';
import uuid from 'uuid';

const router = express.Router();

router.post('/',
  authenticate,
  [
    check('question_id')
      .not()
      .isEmpty()
      .custom((val, { req }) => Question.containsKey(val))
      .withMessage((val, { req }) => req.t('QUESTION_ID_IS_NOT_EXIST')),

    check('content')
      .not()
      .isEmpty()
      .withMessage((val, { req }) => req.t('CONTENT_IS_NOT_EMPTY')),

    check('status').isInt(),
  ],
  checkValidator,
  nextCatch(async (req, res, next) => {
    const {
      question_id,
      content,
      status,
    } = req.body;

    const model = await Answer.create({
      question_id,
      content,
      status,
      answerer_id: req.user.id,
      updated_by: req.user.id,
    });

    res.json(model);
  }));

export default router;