import express from 'express';
import { check } from 'express-validator/check';
import checkValidator from 'app/middlewares/checkValidator';
import { nextCatch } from 'app/utils';
// import pagination from 'app/middlewares/pagination';
import { Permission, GroupPermission } from 'app/models';
import { sanitize } from 'express-validator/filter';

const router = express.Router();

// nested permissions
// const BIG_INTEGER = 10000000;
router.get('/:group_id/permissions',
  // pagination(BIG_INTEGER), //
  [
    check('group_id').isInt(),
  ], checkValidator, nextCatch(async (req, res, next) => {

    const { group_id } = req.params;
    const data = Object.values(await Permission.getDescendentsByGroupId(group_id))

    res.json({
      total: data.length,
      items: data,
    });

  }));

router.patch('/:group_id/permissions', [
  check('group_id').isInt(),
  check('permission_id').not().isEmpty().withMessage((val, { req }) => req.t('GROUP_PERMISSION_ID_IS_NOT_EMPTY')),
  check('permission_id').isInt().withMessage((val, { req }) => req.t('GROUP_PERMISSION_ID_MUST_BE_AN_INTEGER')),
  check('permission_id').not().custom((val, { req }) => Permission.isExist(val))
    .withMessage((val, { req }) => req.t('GROUP_PERMISSION_ID_IS_NOT_EXIST')),

  sanitize('is_attach').customSanitizer(val => val == 'yes'),
],
  checkValidator,
  nextCatch(async (req, res, next) => {
    const { permission_id, is_attach } = req.body;
    const { group_id } = req.params;

    if (is_attach) {
      await GroupPermission.upsert({
        group_id,
        permission_id,
      });
    } else {
      await GroupPermission.destroy({
        where: {
          group_id,
          permission_id
        }
      })
    }

    res.json({
      message: 'ok',
    });
  }));



export default router;