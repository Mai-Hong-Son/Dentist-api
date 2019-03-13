import express from 'express';
import { ServiceIssueDetail } from 'app/models';
import pagination from 'app/middlewares/pagination';
import { nextCatch, throwIfNull } from 'app/utils';
import { check } from 'express-validator/check';
import checkValidator from 'app/middlewares/checkValidator';

const router = express.Router();

// list services
router.get('/',
  pagination(20, ['parent_id', 'service_issue_id']),
  nextCatch(async (req, res) => {

    const { filters } = req.pagination;
    const where = {};

    if (filters.parent_id) {
      where.parent_id = filters.parent_id;
    }

    if (filters.service_issue_id) {
      where.service_issue_id = filters.service_issue_id;
    }

    const data = await ServiceIssueDetail.scope('clientapp')
      .findAndCountAll({
        limit: req.pagination.limit,
        offset: req.pagination.offset,
        where,
      });

    res.pagination(data);
  }));

export default router;