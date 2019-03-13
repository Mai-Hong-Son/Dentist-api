import express from 'express';
import uuid from 'uuid';
import fs from 'fs';
import { check } from 'express-validator/check';

import { throwIfNull, nextCatch, isImage } from 'app/utils';
import checkValidator from 'app/middlewares/checkValidator';
import { ServiceIssue, Service } from 'app/models';
import { authenticate } from 'app/authenticates/auth';
import { resizeImage } from './common';

const router = express.Router();

const { SERVICE_ISSUE_IMAGE_LOCATION } = process.env;

// create
router.put('/:id',
  authenticate,
  [
    check('id').isInt().withMessage((val, { req }) => req.t('SERVICE_ISSUE_ID_IS_NOT_AN_INTEGER')),
    check('title').isString().withMessage((val, { req }) => req.t('SERVICE_ISSUE_TITLE_IS_EMPTY')),
    check('content').isString().withMessage((val, { req }) => req.t('SERVICE_ISSUE_CONTENT_IS_EMPTY')),
    check('service_id').isInt().withMessage((val, { req }) => req.t('SERVICE_ISSUE_SERVICE_ID_IS_NOT_AN_INTEGER')),
    check('service_id').custom((val) => Service.containsKey(val))
      .withMessage((val, { req }) => req.t('SERVICE_ISSUE_SERVICE_ID_IS_NOT_AVAILABLE')),

  ], checkValidator, nextCatch(async (req, res, next) => {

    const { id } = req.params;
    const model = throwIfNull(await ServiceIssue.findOne({
      where: { id }
    }));
    let oldImage = model.image;

    let isUpdateImage = false;
    let uniqueImageName;
    if (req.files && req.files.image) {
      const { image } = req.files;
      const imageExtension = isImage(image);
      if (!imageExtension) {
        return res.status(422).json({
          errors: {
            image: req.t('SERVICE_ISSUE_IMAGE_IS_NOT_AN_IMAGE')
          }
        })
      }

      uniqueImageName = uuid.v4() + '.png';
      await resizeImage(image.data).toFile(SERVICE_ISSUE_IMAGE_LOCATION + '/' + uniqueImageName);
      isUpdateImage = true;
    }

    const {
      title,
      content,
      service_id,
      status
    } = req.body;

    const updateData = {
      title,
      content,
      service_id,
      status,
      updated_by: req.user.id,
    }

    if (isUpdateImage) {
      updateData.image = uniqueImageName;
    }

    await model.updateAttributes(updateData);

    if (isUpdateImage) {
      fs.unlink(SERVICE_ISSUE_IMAGE_LOCATION + '/' + oldImage, (err) => { err && console.log(err) });
    }

    res.json(model);
  }));


export default router;