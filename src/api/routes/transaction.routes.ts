import express from 'express';

import { transactionResource } from '../validators';
import { checkPermission, isAuth, validateRequest } from '../../api/middleware';
import TransactionController from '../../api/controllers/transaction.controller';

const route = express.Router();

route.post(
  '/:clientUuid/transactions',
  isAuth,
  checkPermission('client', 'admin'),
  validateRequest(transactionResource),
  TransactionController.createTransaction
);

export default route;
