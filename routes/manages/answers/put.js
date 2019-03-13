import express from 'express';
import checkValidator from 'app/middlewares/checkValidator';
import { Answer, Question } from 'model';
import { authenticate } from 'authenticates/auth';
import { check } from 'express-validator/check';
import { nextCatch, throwIfNull } from 'utils';

const router = express.Router();

router.put(
  '/:id',
  authenticate,
  [
    check('id').isInt(),
    check('content')
      .not()
      .isEmpty()
      .withMessage((val, { req }) => req.t('ANSWER_CONTENT_IS_NOT_EMPTY')),
    check('question_id').not()
      .isEmpty()
      .custom((val, { req }) => Question.containsKey(val))
      .withMessage((val, { req }) => req.t('QUESTION_ID_IS_NOT_EXIST')),
    check('status').isInt(),
  ],
  checkValidator,
  nextCatch(async (req, res, next) => {
    const model = throwIfNull(await Answer.findOne({
      where: { id: req.params.id }
    }));
    
    const { content, question_id, status } = req.body;
    
    await model.updateAttributes({
      content,
      question_id,
      status,
      // update_at: moment().format('YYYY-MM-DD'),
    });

    res.json(model);
  })
)