import express from 'express';
import { Group } from 'app/models';
import { check } from 'express-validator/check';
import { nextCatch } from 'app/utils';
import pagination from 'app/middlewares/pagination';
import checkValidator from 'app/middlewares/checkValidator';

import permissions from './permission';

const router = express.Router();

router.use('/', permissions);

router.get(
  '/',
  pagination(20),
  nextCatch(async (req, res, next) => {
    const { limit, offset } = req.pagination;
    const data = await Group.findAndCountAll({
      limit,
      offset,
    });
    res.pagination(data);
  }));

// Create
router.post(
  '/',
  check('name').not().isEmpty().withMessage((val, { req }) => req.t('GROUP_NAME_IS_NOT_EMPTY')),
  checkValidator,
  async (req, res, next) => {
    const { name } = req.body;
    const data = await Group.create({ name });
    res.json(data);
  }
);
// Detail
router.get(
  '/:id',
  async (req, res, next) => {
    const { id } = req.params;
    const data = await Group.findById(id);
    res.json(data);
  }
)
// Edit
router.put(
  '/:id',
  check('name')
    .not()
    .isEmpty()
    .withMessage((val, { req }) => req.t('GROUP_NAME_IS_NOT_EMPTY')),

  checkValidator,
  async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const data = await Group.findById(id);
    data.name = name;
    await data.save();
    res.json(data);
  }
);

router.delete(
  '/:id',
  checkValidator,
  async (req, res, next) => {
    const { id } = req.params;
    await Group.destroy({
      where: { id }
    })
    res.json({ message: 'ok' });
  }
);

export default router;