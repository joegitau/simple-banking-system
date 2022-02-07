import { Router } from 'express';

import { clientResource } from '../validators';
import ClientController from '../controllers/client.controller';
import { isAuth, validateRequest } from '../../api/middleware';

const route = Router();

route.post(
  '/',
  validateRequest(clientResource),
  ClientController.registerClient
);
route.post('/login', isAuth, ClientController.loginClient);
route.get('/', ClientController.getClients);
// route.get('/:uuid', ClientController.getClient);
route.get('/:uuid', ClientController.getClientAndTransactionsByQB);
// route.get('/:uuid', ClientController.getClientBankersByQB);
route.put('/:uuid', ClientController.updateClient);
route.delete('/:uuid', ClientController.deleteClient);

export default route;
