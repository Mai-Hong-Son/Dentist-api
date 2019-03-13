// create new issue detail

import express from 'express';
import checkValidator from 'app/middlewares/checkValidator';
import { nextCatch, throwIfNull } from 'app/utils';
import { ServiceIssueDetail, ServiceIssue } from 'app/models';
import { authenticate } from 'app/authenticates/auth';
import { check } from 'express-validator/check';

const router = express.Router();

router.put('/:id',
  authenticate,
  [
    check('id').isInt(),

    check('title').not().isEmpty().withMessage((val, { req }) => req.t('SERVICE_ISSUE_DETAIL_TITLE_IS_NOT_EMPTY')),

    check('display_type').not().isEmpty().isIn([
      ServiceIssueDetail.DISPLAY_TYPE_LIST,
      ServiceIssueDetail.DISPLAY_TYPE_LEAF,
    ]),

    check('content').optional(),

    check('service_issue_id').not()
      .isEmpty()
      .custom((val, { req }) => ServiceIssue.containsKey(val))
      .withMessage((val, { req }) => req.t('SERVICE_ISSUE_DETAIL_ISSUE_ID_IS_NOT_EXIST')),

    check('parent_id').optional()
      .custom((val, { req }) => ServiceIssueDetail.parentable(val, req.params.id))
      .withMessage((val, { req }) => req.t('SERVICE_ISSUE_DETAIL_PARENT_IS_INVALID')),

    check('status').isInt(),
  ],
  checkValidator, nextCatch(async (req, res, next) => {

    const model = throwIfNull(await ServiceIssueDetail.findOne({
      where: { id: req.params.id }
    }))

    const {
      parent_id,
      service_issue_id,
      title,
      content,
      status,
      display_type,
    } = req.body


    await model.updateAttributes({
      parent_id,
      service_issue_id,
      title,
      content,
      status,
      display_type,
      updated_by: req.user.id,
    });

    res.json(model);
  }));

export default router;