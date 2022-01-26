import { Router } from 'express';

import clientRoutes from './client.routes';
import bankerRoutes from './banker.routes';

const routes: Router = Router();

routes.use('/clients', clientRoutes);
routes.use('/bankers', bankerRoutes);

export default routes;
