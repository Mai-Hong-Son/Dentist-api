import express from 'express';
import uuid from 'uuid';
import { ServiceIssue, Service } from 'app/models';
import pagination from 'app/middlewares/pagination';
import { check, body, buildCheckFunction } from 'express-validator/check';
import checkValidator from 'app/middlewares/checkValidator';
import { nextCatch, throwIfNull, isImage } from 'app/utils';
import { authenticate } from 'app/authenticates/auth';
import postServiceIssue from './post';
import putServiceIssue from './put';

const router = express.Router();

// list issues
router.get('/',
  pagination(20,
    ['title', 'service_id', 'status'],
    ['title', 'service_id', 'status']
  ),
  nextCatch(async (req, res) => {

    const { filters } = req.pagination;
    const where = {};

    if (filters.service_id) {
      where.service_id = filters.service_id;
    }

    const data = await ServiceIssue.findAndCountAll({
      limit: req.pagination.limit,
      offset: req.pagination.offset,
      where,
    });

    res.pagination(data);
  }));

// get service issue by id
router.get('/:id', [
  check('id')
    .isInt()
    .withMessage((val, { req }) => req.t('SERVICE_ISSUE_ID_MUST_BE_AN_INTEGER')),

], checkValidator, nextCatch(async (req, res, next) => {

  const model = throwIfNull(await ServiceIssue.findOne({
    where: {
      id: req.params.id,
    }
  }))

  res.json(model);
}));

router.use('/', postServiceIssue);
router.use('/', putServiceIssue);

export default router;