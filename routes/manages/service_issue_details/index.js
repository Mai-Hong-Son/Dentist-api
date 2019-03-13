import express from 'express';
import pagination from 'app/middlewares/pagination';
import { nextCatch, throwIfNull } from 'app/utils';
import { ServiceIssueDetail } from 'app/models';
import checkValidator from 'app/middlewares/checkValidator';
import { check } from 'express-validator/check';

import postIssueDetail from './post';
import putIssueDetail from './put';
import imagesOfIssueDetail from './images';

const router = express.Router();

router.get('/',
  pagination(10),
  nextCatch(async (req, res, next) => {

    const { filters } = req.pagination;
    const where = {};

    if (filters.service_issue_id) {
      where.service_issue_id = filters.service_issue_id;
      // default parent_id = 0
      where.parent_id = 0;
    }

    if (filters.parent_id) {
      where.parent_id = filters.parent_id;
    }

    const data = await ServiceIssueDetail.findAndCountAll({
      limit: req.pagination.limit,
      offset: req.pagination.offset,
      where,
    });

    res.pagination(data);
  }))

router.use('/', postIssueDetail);
router.use('/', putIssueDetail);
router.use('/', imagesOfIssueDetail);

router.get('/:id', [
  check('id').isInt(),
], checkValidator, nextCatch(async (req, res, next) => {
  const model = throwIfNull(await ServiceIssueDetail.findOne({
    where: { id: req.params.id }
  }))

  res.json(model)
}))

export default router;