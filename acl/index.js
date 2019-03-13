import ConnectRoles from 'connect-roles';

import { Permission } from 'app/models';

const acl = new ConnectRoles({
  failureHandler: (req, res, action) => {
    res.status(req.user ? 403 : 401);

    res.json({
      message: req.user ? req.t('ACCESS_DENIAL') : req.t('UNAUTHENTICATED'),
    })
  },
  userProperty: 'user',
  async: true,
});

// rule definitation

// guest permission
acl.use(function (req, action) {
  if (!req.isAuthenticated()) return false;
})


// load from database
acl.use(async (req, action) => {
  return await Permission.allow(req.user, action);
})


export default acl;

export const middleware = acl.middleware.bind(acl);