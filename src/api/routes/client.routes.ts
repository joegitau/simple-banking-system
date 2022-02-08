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
route.post('/login', ClientController.loginClient);
route.get('/', ClientController.getClients);
// route.get('/:uuid', ClientController.getClient);
route.get('/:uuid', ClientController.getClientAndTransactionsByQB);
// route.get('/:uuid', ClientController.getClientBankersByQB);
route.put('/:uuid', isAuth, ClientController.updateClient);
route.delete('/:uuid', isAuth, ClientController.deleteClient);

export default route;
