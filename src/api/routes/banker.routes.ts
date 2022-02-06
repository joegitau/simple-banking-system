import { Router } from 'express';

import validateRequest from '../../api/middleware/validate-request';
import BankerController from '../../api/controllers/banker.controller';
import { bankerValidator } from '../../api/validators/banker.validator';

const route = Router();

route.post(
  '/',
  validateRequest(bankerValidator),
  BankerController.createBanker
);
route.get('/', BankerController.getBanker);
route.get('/:uuid', BankerController.getBanker);
route.put('/:uuid', BankerController.updateBanker);

// connect banker to client
route.put(
  '/:bankerUuid/clients/:clientUuid',
  BankerController.connectBankerToClient
);

export default route;
