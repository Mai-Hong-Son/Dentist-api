import express from 'express';

import authentication from './authentication';
import forgotpassword from './forgot-password';
import bearer from './bearer';
// import bearer from 'app/routes/general/bearer';
// import edit from './edit';

const router = express.Router();

router.use('/', authentication);
router.use('/', forgotpassword);
router.use('/', bearer);
// router.use('/', edit);

export default router;