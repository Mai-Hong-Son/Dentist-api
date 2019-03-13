import express from 'express';

// controllers
import register from './register';
import authentication from './authentication';
import forgotPassword from './forgot-password';
import changePassword from './change-password';
import bearer from '../bearer';
// import bearer from 'app/routes/general/bearer';


const router = express.Router();

router.use('/', register);
router.use('/', authentication);
router.use('/', forgotPassword);
router.use('/', changePassword);
router.use('/', bearer);
// router.use('/', edit);

export default router;