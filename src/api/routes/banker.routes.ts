import { Router } from 'express';

import { createBankerController } from '../controllers/banker.controller';

const route = Router();

route.post('/', createBankerController);

export default route;
