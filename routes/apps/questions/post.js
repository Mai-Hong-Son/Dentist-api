import express from 'express';
import checkValidator from 'app/middlewares/checkValidator';
import { nextCatch } from 'app/utils';
import { Question, Service, ServiceIssue } from 'app/models';
import { authenticate } from 'app/authenticates/bearer';
import { check } from 'express-validator/check';
import { resizeImage } from './common';
import uuid from 'uuid';

const router = express.Router();

const { QUESTION_IMAGE_LOCATION } = process.env;

router.post('/',
  authenticate,
  [
    check('title')
      .not()
      .isEmpty()
      .withMessage((val, { req }) => req.t('QESTION_TITLE_IS_NOT_EMPTY')),

    check('service_id')
      .not()
      .isEmpty()
      .custom((val, { req }) => Service.containsKey(val))
      .withMessage((val, { req }) => req.t('SERVICE_ID_IS_NOT_EXIST')),

    check('service_issue_id')
      .not()
      .isEmpty()
      .custom((val, { req }) => ServiceIssue.containsKey(val))
      .withMessage((val, { req }) => req.t('SERVICE_ISSUE_ID_IS_NOT_EXIST')),

    check('status').isInt(),
    check('tmp_email').optional(),
    check('tmp_phone').optional(),
    check('adl1').optional(),
    check('adl2').optional(),
    check('adl3').optional()
  ],
  checkValidator,
  nextCatch(async (req, res, next) => {
    const {
      service_id,
      service_issue_id,
      title,
      status,
      tmp_email,
      tmp_phone,
      adl1,
      adl2,
      adl3,
    } = req.body;

    // add files
    if (!req.files || !req.files.image) {
      return res.status(422).json({
        errors: {
          image: req.t('QUESTION_IMAGE_IS_EMPTY')
        }
      })
    }

    let { image } = req.files
    if (!Array.isArray(image)) {
      image = [image];
    }

    let images = []
    for (let i of image) {
      const uniqueImageName = uuid.v4() + '.png';
      await resizeImage(i.data).toFile(QUESTION_IMAGE_LOCATION + '/' + uniqueImageName);
      images.push(uniqueImageName);
    }

    const model = await Question.create({
      service_id,
      service_issue_id,
      title,
      status,
      tmp_email,
      tmp_phone,
      adl1,
      adl2,
      adl3,
      images,
      created_by: req.user.id,
      updated_by: req.user.id,
    });

    res.json(model);
  }));

export default router;