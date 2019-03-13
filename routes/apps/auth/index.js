import express from 'express';

import basic from './basic';
import facebook from './facebook';
import google from './google';

const router = express.Router();

router.use('/', basic);
router.use('/facebook', facebook);
router.use('/google', google);

export default router;
