import express from 'express';

import locations from '../general/locations';
import appMenus from './app-menus';

import auth from './auth';
// import user from '../general/user';
import service from './services';
import serviceIssue from './service-issues';
import serviceIssueDetail from './service-issue-details';
import question from './questions';

const router = express.Router();

// router.use('/users', user);
router.use('/auth', auth);

router.use('/app-menus', appMenus);
router.use('/', locations);

router.use('/services', service);
router.use('/service-issues', serviceIssue);
router.use('/service-issue-details', serviceIssueDetail);
router.use('/questions', question);

export default router;