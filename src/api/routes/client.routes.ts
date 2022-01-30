import { Router } from 'express';

import {
  createClientController,
  deleteClientController,
  getClientsController,
  getClientController,
  updateClientController,
} from '../controllers/client.controller';

const route = Router();

route.post('/', createClientController);
route.get('/', getClientsController);
route.get('/:uuid', getClientController);
route.put('/:uuid', updateClientController);
route.delete('/:uuid', deleteClientController);

export default route;
