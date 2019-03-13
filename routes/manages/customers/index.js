import express from 'express';
import { Customer } from 'app/models';
import pagination from 'app/middlewares/pagination';
import { throwIfNull, nextCatch } from 'app/utils';
import createCustomer from './post';
import updateCustomer from './update';
import { authenticate } from 'app/authenticates/auth';

const router = express.Router();

// list of customers
router.get('/', authenticate, pagination(20), async (req, res, next) => {
  const { sorts, filters, limit, offset } = req.pagination;
  const criterial = {
    where: {},
    order: sorts,
    limit,
    offset,
  }
  // filters
  const data = await Customer.findAndCountAll(criterial);
  res.pagination(data);
});

// get customer by id
router.get('/:id', nextCatch(async (req, res, next) => {
  const model = throwIfNull(await Customer.findOne({
    where: {
      id: req.params.id,
    }
  }))
  res.json(model);
}));

router.use('/', createCustomer);
router.use('/', updateCustomer);

export default router;