import { Router } from 'express';

import clientRoutes from './client.routes';

export default () => {
  const router: Router = Router();

  // register all routes
  clientRoutes(router);

  return router;
};
