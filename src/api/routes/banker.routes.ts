import { Router } from 'express';

import { bankerResource } from '../../api/validators';
import BankerController from '../../api/controllers/banker.controller';
import { checkPermission, isAuth, validateRequest } from '../../api/middleware';

const route = Router();

route.post(
  '/',
  validateRequest(bankerResource),
  BankerController.registerBanker
);
route.get('/', isAuth, checkPermission('admin'), BankerController.getBankers);
route.get(
  '/:uuid',
  isAuth,
  checkPermission('banker'),
  BankerController.getBanker
);
route.put(
  '/:uuid',
  isAuth,
  checkPermission('banker', 'admin'),
  BankerController.updateBanker
);

// connect banker to client
route.put(
  '/:bankerUuid/clients/:clientUuid',
  isAuth,
  checkPermission('banker', 'admin'),
  BankerController.connectBankerToClient
);

export default route;
