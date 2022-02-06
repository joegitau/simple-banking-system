import express from 'express';

import validateRequest from '../../api/middleware/validate-request';
import TransactionController from '../../api/controllers/transaction.controller';
import { transactionValidator } from '../../api/validators/transaction.validatior';

const route = express.Router();

const transactionControllerInstance = new TransactionController();

route.post(
  '/:clientUuid/transactions',
  validateRequest(transactionValidator),
  transactionControllerInstance.createTransaction
);

export default route;
