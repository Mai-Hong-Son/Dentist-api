import express from 'express';
import { ServiceIssue } from 'app/models';
import pagination from 'app/middlewares/pagination';
import { nextCatch } from 'app/utils';

const router = express.Router();

// list services
router.get('/',
  pagination(20,
    ['title', 'service_id', 'status'],
    ['title', 'service_id', 'status']),
  nextCatch(async (req, res) => {

    const { filters } = req.pagination;
    const where = {
      status: 1,
    };

    if (filters.service_id) {
      where.service_id = filters.service_id;
    }

    const data = await ServiceIssue.findAndCountAll({
      limit: req.pagination.limit,
      offset: req.pagination.offset,
      where,
      attributes: [
        'id',
        'title',
        // 'image_url',
        'content',
        'image',
      ]
    });

    res.pagination(data);
  }));


export default router;