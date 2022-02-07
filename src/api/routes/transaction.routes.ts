import express from 'express';

import { validateRequest } from '../../api/middleware';
import TransactionController from '../../api/controllers/transaction.controller';
import { transactionResource } from '../validators/transaction.validator';

const route = express.Router();

route.post(
  '/:clientUuid/transactions',
  validateRequest(transactionResource),
  TransactionController.createTransaction
);

export default route;
