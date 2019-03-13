import express from 'express';
import uuid from 'uuid';
import { Question } from 'app/models';
import pagination from 'app/middlewares/pagination';
import { check, body, buildCheckFunction } from 'express-validator/check';
import checkValidator from 'app/middlewares/checkValidator';
import { nextCatch, throwIfNull } from 'app/utils';

const router = express.Router();

// list questions
router.get('/',
  pagination(20,
    ['title', 'service_id', 'service_issue_id', 'status'],
    ['title', 'service_id', 'service_issue_id', 'status']
  ),
  nextCatch(async (req, res) => {
    const { filters } = req.pagination;
    const where = {};

    Object.keys(filters).map(key => where[key] = filters[key]);

    const data = await Question.findAndCountAll({
      limit: req.pagination.limit,
      offset: req.pagination.offset,
      where,
    });

    res.pagination(data);
  }));

// get question by id
router.get('/:id', [
  check('id')
    .isInt()
    .withMessage((val, { req }) => req.t('QUESTION_ID_MUST_BE_AN_INTEGER')),
],
  checkValidator,
  nextCatch(async (req, res, next) => {
    const model = throwIfNull(await Question.findOne({
      where: {
        id: req.params.id,
      }
    }))
    res.json(model);
  }));

export default router;