import express from 'express';
import { Service, ServiceIssue } from 'app/models';
import pagination from 'app/middlewares/pagination';
import { check } from 'express-validator/check';
import { sanitize } from 'express-validator/filter';
import checkValidator from 'app/middlewares/checkValidator';
import { nextCatch, throwIfNull } from 'app/utils';
import acl from 'app/acl';
import { authenticate } from 'app/authenticates/auth';


const router = express.Router();

// list services
router.get('/',
  pagination(20),
  authenticate,
  acl.can('manages/services'),
  async (req, res) => {
    const data = await Service.findAndCountAll({
      limit: req.pagination.limit,
      offset: req.pagination.offset,
      // include: [{
      //   model: ServiceIssue,
      //   as: 'issues',
      // }]
    });

    res.pagination(data);
  });


// get services by id
router.get('/:id', [
  check('id').isInt().withMessage((val, { req }) => req.t('SERVICE_ID_MUST_BE_AN_INTEGER')),
], checkValidator, nextCatch(async (req, res, next) => {

  const model = throwIfNull(await Service.findOne({
    where: {
      id: req.params.id,
    }
  }))

  res.json(model);
}));





// create service
router.post('/', [
  sanitize('name').trim(),
  check('name').not().isEmpty().withMessage((val, { req }) => req.t('SERVICE_NAME_IS_NOT_EMPTY')),
  check('active').optional().isInt().withMessage((val, { req }) => req.t('SERVICE_ACTIVE_MUST_BE_INTEGER')),
], checkValidator, nextCatch(async (req, res, next) => {
  const { name, active } = req.body;

  const model = await Service.create({
    name,
    active,
  });

  res.json(model);
}));


// service by id
router.put('/:id', [
  check('id').isInt().withMessage((val, { req }) => req.t('SERVICE_ID_MUST_BE_AN_INTEGER')),

  sanitize('name').trim(),
  check('name').not().isEmpty().withMessage((val, { req }) => req.t('SERVICE_NAME_IS_NOT_EMPTY')),

  check('active').optional().isInt().withMessage((val, { req }) => req.t('SERVICE_ACTIVE_MUST_BE_INTEGER')),
], checkValidator, nextCatch(async (req, res, next) => {

  const model = throwIfNull(await Service.findOne({
    where: {
      id: req.params.id,
    }
  }))

  await model.updateAttributes(req.body);
  res.json(model);
}));

router.get('/:id',
  [
    check('id').isInt().withMessage((val, { req }) => req.t('SERVICE_ID_MUST_BE_AN_INTEGER'))
  ],
  checkValidator,
  nextCatch(async (req, res, next) => {
    const model = throwIfNull(await Service.findOne({
      where: { id: req.params.id }
    }))

    res.json(model);
  }));

router.delete('/:id', [
  check('id').isInt().withMessage((val, { req }) => req.t('SERVICE_ID_MUST_BE_AN_INTERER')),
],
  checkValidator,
  nextCatch(async (req, res, next) => {

    await Service.destroy({
      where: { id: req.params.id }
    });

    res.json({ message: 'ok' });
  }))

export default router;