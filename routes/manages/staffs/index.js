import express from 'express';
import { User } from '../../../models';
import pagination from '../../../middlewares/pagination';
import createError from 'http-errors';

// const { CUSTOMER_GROUP_ID } = User;
const router = express.Router();

// list of staff
router.get('/', pagination(20), async (req, res, next) => {
  const data = await User.findAndCountAll({
    where: {
      // group_id: {
      //   $ne: CUSTOMER_GROUP_ID,
      // }
    },
    limit: req.pagination.limit,
    offset: req.pagination.offset,
  });

  res.pagination(data);
});

// get staft by id
router.get('/:id', async (req, res, next) => {
  const model = await User.findOne({
    where: {
      id: req.params.id,
      // group_id: {
      //   $ne: CUSTOMER_GROUP_ID
      // }
    }
  });
  if (!model) return next(createError(404));

  res.json(model);
})

export default router;