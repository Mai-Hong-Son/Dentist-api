import express from 'express';
import { nextCatch } from 'app/utils';
import { AppMenu } from 'app/models';

const router = express.Router();

router.get('/tree', nextCatch(async (req, res, next) => {
  const tree = await AppMenu.tree();
  res.json(tree);
}));

export default router;