import { Router } from 'express';

import { createClientController } from '../controllers/client.controller';

const route = Router();

route.post('/', createClientController);

export default route;
