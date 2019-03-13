import express from 'express'
import pagination from 'app/middlewares/pagination';
import { nextCatch } from 'app/utils';
import { Adl1, Adl2, Adl3 } from 'app/models';

const router = express.Router();

router.get('/adl1s', pagination(100000,
  ['name'],
  ['name']
), nextCatch(async (req, res, next) => {

  const { filters, limit, offset, sorts } = req.pagination;

  const criterial = {
    where: {},
    include: [],
    limit,
    offset,
    order: sorts,
  };

  if (filters.name) {
    criterial.where.name = {
      $like: '%' + (filters.name + '').replace('%', '') + '%'
    }
  }

  const data = await Adl1.findAndCountAll(criterial);

  res.pagination(data);
}));

router.get('/adl2s', pagination(100000,
  ['name', 'adl1_id'],
  ['name']
), nextCatch(async (req, res) => {

  const { filters, limit, offset, sorts } = req.pagination;

  const criterial = {
    where: {},
    include: [],
    limit,
    offset,
    order: sorts,
  };

  if (filters.name) {
    criterial.where.name = {
      $like: '%' + (filters.name + '').replace('%', '') + '%'
    }
  }

  if (filters.adl1_id) {
    criterial.where.adl1_id = {
      $eq: filters.adl1_id
    }
  }

  const data = await Adl2.findAndCountAll(criterial);

  res.pagination(data);
}));



router.get('/adl3s', pagination(100000,
  ['name', 'adl2_id'],
  ['name']
), nextCatch(async (req, res) => {

  const { filters, limit, offset, sorts } = req.pagination;

  const criterial = {
    where: {},
    include: [],
    limit,
    offset,
    order: sorts,
  };

  if (filters.name) {
    criterial.where.name = {
      $like: '%' + (filters.name + '').replace('%', '') + '%'
    }
  }

  if (filters.adl2_id) {
    criterial.where.adl2_id = {
      $eq: filters.adl2_id
    }
  }

  const data = await Adl3.findAndCountAll(criterial);

  res.pagination(data);
}));


export default router;