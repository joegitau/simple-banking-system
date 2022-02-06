import { Router } from 'express';

import validateRequest from '../../api/middleware/validate-request';
import BankerController from '../../api/controllers/banker.controller';
import { bankerValidator } from '../../api/validators/banker.validator';

const route = Router();
const bankerInstance = new BankerController();

route.post('/', validateRequest(bankerValidator), bankerInstance.createBanker);
route.get('/', bankerInstance.getBanker);
route.get('/:uuid', bankerInstance.getBanker);
route.put('/:uuid', bankerInstance.updateBanker);

// connect banker to client
route.put(
  '/:bankerUuid/clients/:clientUuid',
  bankerInstance.connectBankerToClient
);

export default route;
