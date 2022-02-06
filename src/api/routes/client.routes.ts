import { Router } from 'express';

import validateRequest from '../../api/middleware/validate-request';
import { clientCreator } from '../validators/client.validator';

import {
  createClientController,
  deleteClientController,
  getClientsController,
  getClientController,
  updateClientController,
  getClientAndTransactionsByQBController,
  getClientBankersByQBController,
} from '../controllers/client.controller';

const route = Router();

route.post('/', validateRequest(clientCreator), createClientController);
route.get('/', getClientsController);
// route.get('/:uuid', getClientController);
route.get('/:uuid', getClientAndTransactionsByQBController);
// route.get('/:uuid', getClientBankersByQBController);
route.put('/:uuid', updateClientController);
route.delete('/:uuid', deleteClientController);

export default route;
