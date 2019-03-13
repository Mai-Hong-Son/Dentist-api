import express from 'express';
import { authenticate, callback } from '../../../authenticates/google';

const router = express.Router();

router.get('/', authenticate);
router.get('/callback', callback, async (req, res, next) => {
  const tokens = await req.user.generateTokens();
  res.json(tokens);
});

export default router;