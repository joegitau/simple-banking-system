import express from 'express';

import TransactionController from '../../api/controllers/transaction.controller';

const route = express.Router();

const transactionControllerInstance = new TransactionController();

route.post(
  '/:clientUuid/transactions',
  transactionControllerInstance.createTransaction
);

export default route;
