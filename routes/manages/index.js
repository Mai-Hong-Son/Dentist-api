import express from 'express';

import locations from '../general/locations';
import customers from './customers';
import users from './users';
import staffs from './staffs';
import permissions from './permissions';
import groups from './groups';
import auth from './auth';
import services from './services';
import serviceIssues from './service_issues';
import serviceIssueDetails from './service_issue_details';
// import xRayLocations from './xray_locations';

const router = express.Router();

router.use('/', locations);
router.use('/customers', customers);
router.use('/users', users);
// router.use('/x-ray-locations', xRayLocations);

router.use('/staffs', staffs);
router.use('/permissions', permissions);
router.use('/groups', groups);

router.use('/services', services);
router.use('/service-issues', serviceIssues);
router.use('/service-issue-details', serviceIssueDetails);
router.use('/auth', auth);


export default router;