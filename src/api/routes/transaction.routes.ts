import express from 'express';

import { transactionResource } from '../validators';
import { checkRole, isAuth, validateRequest } from '../../api/middleware';
import TransactionController from '../../api/controllers/transaction.controller';

const route = express.Router();

route.post(
  '/:clientUuid/transactions',
  isAuth,
  checkRole('client'),
  validateRequest(transactionResource),
  TransactionController.createTransaction
);

export default route;
