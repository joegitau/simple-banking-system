import { Router } from 'express';

import {
  createClientController,
  deleteClientController,
  fetchClientsController,
  getClientController,
  updateClientController,
} from '../controllers/client.controller';

const route = Router();

route.post('/', createClientController);
route.get('/', fetchClientsController);
route.get('/:uuid', getClientController);
route.put('/:uuid', updateClientController);
route.put('/:uuid', deleteClientController);

export default route;
