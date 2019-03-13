import express from 'express';
import { Service } from 'app/models';
import pagination from 'app/middlewares/pagination';

const router = express.Router();

// list services
router.get('/',
  pagination(20),
  async (req, res) => {
    const data = await Service.findAndCountAll({
      limit: req.pagination.limit,
      offset: req.pagination.offset,
      // include: [{
      //   model: ServiceIssue,
      //   as: 'issues',
      // }]
      attributes: [
        'id',
        'name'
      ],
      order: [
        ['z_order', 'ASC'],
        ['name', 'ASC'],
      ]
    });

    res.pagination(data);
  });


export default router;