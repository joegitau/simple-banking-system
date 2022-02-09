import { Router } from 'express';

import { clientResource } from '../validators';
import ClientController from '../controllers/client.controller';
import { checkPermission, isAuth, validateRequest } from '../../api/middleware';

const route = Router();

route.post(
  '/',
  validateRequest(clientResource),
  ClientController.registerClient
);
route.post('/login', ClientController.loginClient);
route.get(
  '/',
  isAuth,
  checkPermission('client', 'admin'),
  ClientController.getClients
);
// route.get('/:uuid', checkPermission('client'), ClientController.getClient);
route.get(
  '/:uuid',
  isAuth,
  checkPermission('client'),
  ClientController.getClientAndTransactionsByQB
);
// route.get('/:uuid', isAuth, checkPermission('client', 'admin'), ClientController.getClientBankersByQB);
route.put(
  '/:uuid',
  isAuth,
  checkPermission('client', 'admin'),
  ClientController.updateClient
);
route.delete(
  '/:uuid',
  isAuth,
  checkPermission('client', 'admin'),
  ClientController.deleteClient
);

export default route;
