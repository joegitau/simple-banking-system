import { Router } from 'express';

import BankerController from '../../api/controllers/banker.controller';

const route = Router();
const bankerInstance = new BankerController();

route.post('/', bankerInstance.createBanker);
route.get('/', bankerInstance.getBanker);
route.get('/:uuid', bankerInstance.getBanker);
route.put('/:uuid', bankerInstance.updateBanker);

export default route;
