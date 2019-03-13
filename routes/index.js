import express from 'express';

// import user from './general/user';
import apps from './apps';
import manages from './manages';

const router = express.Router();

// heartbeat check
router.use('/manages', manages);
router.use('/', apps);

router.get('/', (req, res, next) => res.json('ok'));
// router.use('/users', user);

export default router;
