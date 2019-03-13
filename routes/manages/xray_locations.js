
import express from 'express';
import pagination from 'app/middlewares/pagination';
import { nextCatch, throwIfNull, isTime } from 'app/utils';
import { XRayLocation } from 'app/models';
import { check, checkSchema } from 'express-validator/check';
import checkValidator from 'app/middlewares/checkValidator';

const router = express.Router()

router.get('/', pagination(20), nextCatch(async (req, res, next) => {

  const { limit, filters, offset, sorts } = req.pagination

  const criterial = {
    where: {},
    limit,
    offset,
    orders: sorts,
  }

  if (typeof filters.adl1 != 'undefined') {
    criterial.where.adl1 = filters.adl1
  }

  if (typeof filters.status != 'undefined') {
    criterial.where.status = filters.status;
  }

  const data = await XRayLocation.findAndCount(criterial);

  res.pagination(data)
}))



router.get('/:id', [
  check('id').isInt(),
], checkValidator, nextCatch(async (req, res, next) => {
  const model = throwIfNull(await XRayLocation.findOne({
    where: { id: req.params.id }
  }))

  res.json(model)
}))


router.post('/',
  [
    check('title').not().isEmpty().withMessage((val, { req }) => req.t('XRAY_LOCATION_TITLE_MUST_NOT_BE_EMPTY')),
    check('address').optional(),
    check('adl1').not().isEmpty().custom((val, { req }) => Adl1.containsKey(val)),
  ],
  // checkSchema({
  //   title: {
  //     isEmpty: false,
  //     errorMessage: (val, { req }) => req.t('XRAY_LOCATION_TITLE_MUST_NOT_BE_EMPTY'),

  //   },
  //   address: {
  //     optional: true,
  //   },
  //   adl1: {
  //     isEmpty: false,
  //     custom: (val) => Adl1.containsKey(val),
  //   },
  //   pricing: {
  //     isEmpty: false,
  //     isInt: true,
  //     errorMessage: (val, { req }) => req.t('XRAY_LOCATION_PRICING_MUST_BE_INTEGER'),
  //   },


  //   // worktimes
  //   'worktimes.mon': {
  //     optional: true,
  //   },
  //   'worktimes.tue': {
  //     optional: true,
  //   },
  //   'worktimes.wed': {
  //     optional: true,
  //   },
  //   'worktimes.thu': {
  //     optional: true,
  //   },
  //   'worktimes.fri': {
  //     optional: true,
  //   },
  //   'worktimes.sat': {
  //     optional: true,
  //   },
  //   'worktimes.*.start_at': {
  //     isEmpty: false,
  //     custom: (val) => isTime(val)
  //   },
  //   'worktimes.*.end_at': {
  //     isEmpty: false,
  //     custom: (val, { req }) => isTime(val),
  //   },

  //   'worktimes.mon.end_at': {
  //     custom: (val, { req }) => req.body.worktimes.start_at <= val,
  //   },
  //   'worktimes.tue': {
  //     custom: (val, { req }) => req.body.worktimes.start_at <= val,
  //   },
  //   'worktimes.wed': {
  //     custom: (val, { req }) => req.body.worktimes.start_at <= val,
  //   },
  //   'worktimes.thu': {
  //     custom: (val, { req }) => req.body.worktimes.start_at <= val,
  //   },
  //   'worktimes.fri': {
  //     custom: (val, { req }) => req.body.worktimes.start_at <= val,
  //   },
  //   'worktimes.sat': {
  //     custom: (val, { req }) => req.body.worktimes.start_at <= val,
  //   },
  // })
  checkValidator, nextCatch(async (req, res, next) => {
    const {
      title,
      address,
      adl1,
      pricing,
      worktimes,
    } = req.body


    res.json(req.body)
  }));

export default router;  