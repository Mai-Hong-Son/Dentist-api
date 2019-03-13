import express from 'express';
import { authenticate } from 'app/authenticates/auth';
import checkValidator from 'app/middlewares/checkValidator';
import { nextCatch, throwIfNull } from 'app/utils';
import { check } from 'express-validator/check';
import fs from 'fs';
import uuid from 'uuid';
import { ServiceIssueDetail } from 'app/models';
import { resizeImage } from './common';

const router = express.Router();
const { SERVICE_ISSUE_DETAIL_IMAGE_LOCATION } = process.env;

// add
router.put(
  '/:id/images',
  authenticate,
  [
    check('id').isInt(),
  ],
  checkValidator,
  nextCatch(async (req, res, next) => {
    const model = throwIfNull(await ServiceIssueDetail.findOne({
      where: { id: req.params.id }
    }))

    // update files
    if (!req.files || !req.files.image) {
      return res.status(422).json({
        errors: {
          image: req.t('SERVICE_ISSUE_DETAIL_IMAGE_IS_EMPTY')
        }
      })
    }

    const { image } = req.files
    const uniqueImageName = uuid.v4() + '.png';
    await resizeImage(image.data).toFile(SERVICE_ISSUE_DETAIL_IMAGE_LOCATION + '/' + uniqueImageName);

    const images = [
      ...model.images,
      uniqueImageName
    ]

    await model.updateAttributes({
      images,
    })

    res.json(model)
  }))

// remove
router.delete('/:id/images/:order',
  authenticate, [
    check('id').isInt(),
    check('order').isInt(),
  ], checkValidator, nextCatch(async (req, res, next) => {
    const model = throwIfNull(await ServiceIssueDetail.findOne({
      where: { id: req.params.id }
    }))

    const { images } = model;
    const { order } = req.params;

    if (typeof images[req.params.order] === 'undefined') {
      return res.status(422).json({
        errors: {
          order: req.t('SERVICE_ISSUE_DETAIL_ORDER_INVALID'),
        },
      })
    }

    const removeImage = SERVICE_ISSUE_DETAIL_IMAGE_LOCATION + '/' + images[order];
    images.splice(order, 1)

    model.images = images;
    await model.save();

    // delete file
    fs.unlink(removeImage, (err) => { });
    res.json(model)
  }))

export default router;