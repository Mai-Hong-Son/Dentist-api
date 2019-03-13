// create new issue detail

import express from 'express';
import checkValidator from 'app/middlewares/checkValidator';
import { nextCatch } from 'app/utils';
import { ServiceIssueDetail, ServiceIssue } from 'app/models';
import { authenticate } from 'app/authenticates/auth';
import { check } from 'express-validator/check';

const router = express.Router();

router.post('/',
  authenticate,
  [
    check('title').not().isEmpty().withMessage((val, { req }) => req.t('SERVICE_ISSUE_DETAIL_TITLE_IS_NOT_EMPTY')),
    
    check('content').optional(),

    check('display_type').isIn([
      ServiceIssueDetail.DISPLAY_TYPE_LIST,
      ServiceIssueDetail.DISPLAY_TYPE_LEAF,
    ]),

    check('service_issue_id').not()
      .isEmpty()
      .custom((val, { req }) => ServiceIssue.containsKey(val))
      .withMessage((val, { req }) => req.t('SERVICE_ISSUE_DETAIL_ISSUE_ID_IS_NOT_EXIST')),

    check('parent_id').optional()
      .custom(val => ServiceIssueDetail.containsKey(val))
      .withMessage((val, { req }) => req.t('SERVICE_ISSUE_DETAIL_PARENT_IS_INVALID')),
    
    check('status').isInt(),
  ],
  checkValidator, nextCatch(async (req, res, next) => {
    const {
      parent_id,
      service_issue_id,
      title,
      content,
      status,
      display_type,
    } = req.body

    const model = await ServiceIssueDetail.create({
      parent_id,
      service_issue_id,
      title,
      status,
      content,
      created_by: req.user.id,
      updated_by: req.user.id,
      display_type,
    });

    res.json(model);
  }));

export default router;