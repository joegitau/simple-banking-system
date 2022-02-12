import { Router } from 'express';

import clientRoutes from './client.routes';
import bankerRoutes from './banker.routes';
import transactionRoutes from './transaction.routes';
import authenticationRoutes from './authentication.routes';

const routes: Router = Router();

routes.use('/clients', clientRoutes);
routes.use('/bankers', bankerRoutes);
routes.use('/clients', transactionRoutes);
routes.use('/auth', authenticationRoutes);

export default routes;
