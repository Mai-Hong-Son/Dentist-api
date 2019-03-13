import express from 'express';
import { Permission, Group, GroupPermission } from 'app/models';
import checkValidator from 'app/middlewares/checkValidator';
import { check } from 'express-validator/check';
import pagination from 'app/middlewares/pagination';
import { nextCatch, throwIfNull } from 'app/utils';
import { sanitize } from 'express-validator/filter';

const router = express.Router();

router.get('/', pagination(20), nextCatch(async (req, res, next) => {

  const criterial = {
    include: [],
    limit: req.pagination.limit,
    offset: req.pagination.offset,
  };

  // extract condition
  const filters = req.query.filters || {};
  if (filters.group_id) {
    criterial.include.push({
      model: GroupPermission,
      where: { group_id: filters.group_id }
    });
  }

  const data = await Permission.findAndCountAll(criterial);

  res.pagination(data);
}));


router.post('/', [
  check('name')
    .not()
    .isEmpty()
    .withMessage((val, { req }) => req.t('PERMISSION_NAME_IS_NOT_EMPTY')),

  check('parent_id')
    .optional()
    .isEmpty()
    .withMessage((val, { req }) => req.t('PERMISSION_PARENT_IS_NOT_EMPTY')),

  sanitize('parent_id').customSanitizer(val => parseInt(val) == val ? val : 0),

  check('code')
    .not()
    .isEmpty()
    .custom((val, { req }) => Permission.isUnique(val))
    .withMessage(() => req.t('PERMISSION_CODE_MUST_BE_UNIQUE')),

  check('description').optional()
    .not()
    .isEmpty(),
],
  checkValidator,
  nextCatch(async (req, res, next) => {
    const data = await Permission.create(req.body);

    res.json(data);
  }));



router.get(
  '/:id',
  [
    check('id').isInt(),
  ],
  checkValidator,
  nextCatch(async (req, res, next) => {
    const data = throwIfNull(await Permission.findOne({
      where: { id: req.params.id }
    }));
    res.json(data);
  }));



router.put(
  '/:id',
  [
    check('id').isInt(),

    check('name')
      .not()
      .isEmpty()
      .withMessage((val, { req }) => req.t('PERMISSION_NAME_IS_NOT_EMPTY')),

    check('parent_id')
      .optional()
      .not()
      .isEmpty()
      .withMessage((val, { req }) => req.t('PERMISSION_PARENT_IS_NOT_EMPTY')),

    check('code')
      .not()
      .isEmpty()
      .custom((val, { req }) => Permission.isUnique(val))
      .withMessage(() => req.t('PERMISSION_CODE_MUST_BE_UNIQUE')),

    check('description').optional()
      .not()
      .isEmpty(),
  ],

  checkValidator,
  nextCatch(async (req, res, next) => {
    const { id } = req.params;
    const model = throwIfNull(await Permission.findOne({
      where: { id }
    }));

    model.updateAttributes(req.body);

    await model.save();
    res.json(model);
  }));


router.delete(
  '/:id',
  [
    check('id').isInt(),
  ],
  checkValidator,
  nextCatch(async (req, res, next) => {
    const { id } = req.params;

    await Service.destroy({
      where: { id }
    });

    res.json({
      message: 'ok',
    });
  }));


export default router;