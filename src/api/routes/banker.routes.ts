import { Router } from 'express';

import { validateRequest } from '../../api/middleware';
import BankerController from '../../api/controllers/banker.controller';
import { bankerResource } from '../../api/validators';

const route = Router();

route.post('/', validateRequest(bankerResource), BankerController.createBanker);
route.get('/', BankerController.getBanker);
route.get('/:uuid', BankerController.getBanker);
route.put('/:uuid', BankerController.updateBanker);

// connect banker to client
route.put(
  '/:bankerUuid/clients/:clientUuid',
  BankerController.connectBankerToClient
);

export default route;
