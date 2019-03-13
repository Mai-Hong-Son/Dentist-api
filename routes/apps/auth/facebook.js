import express from 'express';
import { authenticate } from '../../../authenticates/facebook';

const router = express.Router();

router.get('/', authenticate);

export default router;