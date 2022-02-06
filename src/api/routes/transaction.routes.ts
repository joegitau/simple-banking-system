import express from 'express';

import validateRequest from '../../api/middleware/validate-request';
import TransactionController from '../../api/controllers/transaction.controller';
import { transactionValidator } from '../validators/transaction.validator';

const route = express.Router();

route.post(
  '/:clientUuid/transactions',
  validateRequest(transactionValidator),
  TransactionController.createTransaction
);

export default route;
