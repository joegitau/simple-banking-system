import express from 'express';

import validateRequest from '../../api/middleware/validate-request';
import TransactionController from '../../api/controllers/transaction.controller';
import { transactionValidator } from '../../api/validators/transaction.validatior';

const route = express.Router();

route.post(
  '/:clientUuid/transactions',
  validateRequest(transactionValidator),
  TransactionController.createTransaction
);

export default route;
