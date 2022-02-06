import { NextFunction, Request, Response } from 'express';

import Logger from '../../utils/logger';
import TransactionService from '../../api/services/transaction.service';

class TransactionController {
  async createTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const { clientUuid } = req.params;

      const transaction = await TransactionService.createTransaction(
        clientUuid,
        req.body
      );

      // prettier-ignore
      Logger.debug('Creating a Transaction for Client with uuid: %o', clientUuid);
      return res.status(201).json(transaction);
    } catch (e: any) {
      next(e);
    }
  }
}

export default new TransactionController();
