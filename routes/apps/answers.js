import express from 'express';
import uuid from 'uuid';
import { Answer } from 'app/models';
import { check } from 'express-validator/check';
import pagination from 'app/middlewares/pagination';
import checkValidator from 'app/middlewares/checkValidator';
import { nextCatch, throwIfNull } from 'app/utils';

const router = express.Router();

// list answers
router.get('/',
  pagination(20,
    ['question_id', 'answerer_id', 'status'],
    ['question_id', 'answerer_id', 'status']
  ),
  nextCatch(async (req, res) => {
    const { filters } = req.pagination;
    const where = {};

    Object.keys(filters).map(key => where[key] = filters[key]);

    const data = await Answer.findAndCountAll({
      limit: req.pagination.limit,
      offset: req.pagination.offset,
      where,
    });

    res.pagination(data);
  }));

// get answer by id
router.get('/:id',
  [
    check('id')
      .isInt()
      .withMessage((val, { req }) => req.t('ANSWER_ID_MUST_BE_AN_INTEGER')),
  ],
  checkValidator,
  nextCatch(async (req, res, next) => {
    const model = throwIfNull(await Answer.findOne({
      where: {
        id: req.params.id,
      }
    }))
    res.json(model);
  }));

export default router;