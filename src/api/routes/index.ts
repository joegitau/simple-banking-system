import { Router } from 'express';

import clientRoutes from './client.routes';
import bankerRoutes from './banker.routes';
import transactionRoutes from './transaction.routes';
import authenticationRoutes from './authentication.routes';

const routes: Router = Router();

routes.use('/auth', authenticationRoutes);
routes.use('/clients', clientRoutes);
routes.use('/bankers', bankerRoutes);
routes.use('/clients', transactionRoutes);

export default routes;
