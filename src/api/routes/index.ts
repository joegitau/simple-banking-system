import { Router } from 'express';

import clientRoutes from './client.routes';
import bankerRoutes from './banker.routes';
import transactionRoutes from './transaction.routes';

const routes: Router = Router();

routes.use('/clients', clientRoutes);
routes.use('/bankers', bankerRoutes);
routes.use('/clients', transactionRoutes);

export default routes;
