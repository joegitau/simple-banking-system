import { Router } from 'express';

import { bankerResource } from '../../api/validators';
import BankerController from '../../api/controllers/banker.controller';
import { checkRole, isAuth, validateRequest } from '../../api/middleware';

const route = Router();

route.post('/', validateRequest(bankerResource), BankerController.createBanker);
route.get('/', BankerController.getBanker);
route.get('/:uuid', BankerController.getBanker);
route.put('/:uuid', isAuth, checkRole('banker'), BankerController.updateBanker);

// connect banker to client
route.put(
  '/:bankerUuid/clients/:clientUuid',
  BankerController.connectBankerToClient
);

export default route;
