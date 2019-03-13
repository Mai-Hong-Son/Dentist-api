import express from 'express';
import uuid from 'uuid';
import { throwIfNull, nextCatch, isImage } from 'app/utils';
import { check } from 'express-validator/check';
import checkValidator from 'app/middlewares/checkValidator';
import { ServiceIssue, Service } from 'app/models';
import { authenticate } from 'app/authenticates/auth';
import { resizeImage } from './common';

const router = express.Router();

const { SERVICE_ISSUE_IMAGE_LOCATION } = process.env;

// create
router.post('/',
  authenticate,
  [
    check('title').isString().withMessage((val, { req }) => req.t('SERVICE_ISSUE_TITLE_IS_EMPTY')),
    check('content').isString().withMessage((val, { req }) => req.t('SERVICE_ISSUE_CONTENT_IS_EMPTY')),
    check('service_id').isInt().withMessage((val, { req }) => req.t('SERVICE_ISSUE_SERVICE_ID_IS_NOT_AN_INTEGER')),
    check('service_id').custom((val) => Service.containsKey(val))
      .withMessage((val, { req }) => req.t('SERVICE_ISSUE_SERVICE_ID_IS_NOT_AVAILABLE')),

  ], checkValidator, nextCatch(async (req, res, next) => {

    if (!req.files || !req.files.image) {
      return res.status(422).json({
        errors: {
          image: req.t('SERVICE_ISSUE_IMAGE_IS_EMPTY')
        }
      })
    }

    const { image } = req.files;
    const imageExtension = isImage(image);
    if (!imageExtension) {
      return res.status(422).json({
        errors: {
          image: req.t('SERVICE_ISSUE_IMAGE_IS_NOT_AN_IMAGE')
        }
      })
    }

    const uniqueImageName = uuid.v4() + '.png';
    await resizeImage(image.data).toFile(SERVICE_ISSUE_IMAGE_LOCATION + '/' + uniqueImageName);

    const {
      title,
      content,
      service_id,
      status
    } = req.body;

    const model = await ServiceIssue.create({
      title,
      content,
      service_id,
      image: uniqueImageName,
      status,
      created_by: req.user.id,
      updated_by: req.user.id,
    });

    res.json(model);
  }));


export default router;