import { Request, Response } from 'express';

import Logger from '../../utils/logger';
import { TransactionService } from '../../api/services/transaction.service';

export default class TransactionController {
  async createTransaction(req: Request, res: Response) {
    try {
      const { clientUuid } = req.params;

      const transactionServiceInstance = new TransactionService();
      const transaction = await transactionServiceInstance.createTransaction(
        clientUuid,
        req.body
      );

      // prettier-ignore
      Logger.debug('Creating a Transaction for Client with uuid: %o', clientUuid);
      return res.status(201).json(transaction);
    } catch (e: any) {
      Logger.error('Error %o', e.message);
    }
  }
}
