import { Router } from 'express';

import { clientCreator } from '../validators/client.validator';
import ClientController from '../controllers/client.controller';
import validateRequest from '../../api/middleware/validate-request';

const route = Router();

route.post(
  '/',
  validateRequest(clientCreator),
  ClientController.registerClient
);
route.get('/', ClientController.getClients);
// route.get('/:uuid', ClientController.getClient);
route.get('/:uuid', ClientController.getClientAndTransactionsByQB);
// route.get('/:uuid', ClientController.getClientBankersByQB);
route.put('/:uuid', ClientController.updateClient);
route.delete('/:uuid', ClientController.deleteClient);

export default route;
