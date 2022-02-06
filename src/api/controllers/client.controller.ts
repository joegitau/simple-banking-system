import { Request, Response, NextFunction } from 'express';

import Logger from '../../utils/logger';
import ClientService from '../services/client.service';
import { TransactionType } from '../../api/entities/Transaction.entity';
import { SearchQueryOptions } from '../../api/services/common/query-builder-options';

class ClientController {
  async createClient(req: Request, res: Response, next: NextFunction) {
    try {
      const client = await ClientService.createClient(req.body);

      Logger.debug('Created Client with uuid: %o', client?.uuid);
      return res.status(201).json(client);
    } catch (e: any) {
      next(e);
    }
  }

  async registerClient(req: Request, res: Response, next: NextFunction) {
    try {
      const client = await ClientService.registerClient(req.body);

      Logger.debug('Created Client with uuid: %o', client?.client.uuid);
      return res.status(201).json(client);
    } catch (e: any) {
      next(e);
    }
  }

  async getClient(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;

    try {
      const client = await ClientService.getClientByUuid(uuid);
      return res.json(client);
    } catch (e: any) {
      next(e);
    }
  }

  async getClients(req: Request, res: Response, next: NextFunction) {
    try {
      const clients = await ClientService.getClients();
      return res.json(clients);
    } catch (e: any) {
      next(e);
    }
  }

  async getClientAndTransactionsByQB(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { uuid } = req.params;
      const queryOptions: SearchQueryOptions = {
        uuid,
        transactionType: TransactionType.DEPOSIT,
      };

      const client = await ClientService.getCientAndTransactionsQB(
        queryOptions
      );

      res.json(client);
    } catch (e: any) {
      next(e);
    }
  }

  // FIXME - for some reason not working!
  async getClientBankersByQB(req: Request, res: Response, next: NextFunction) {
    try {
      const { uuid } = req.params;
      const queryOptions: SearchQueryOptions = { uuid };

      const client = await ClientService.getClientAndBankersQB(queryOptions);

      res.json(client);
    } catch (e: any) {
      next(e);
    }
  }

  async updateClient(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;

    try {
      const updatedClient = await ClientService.updateClient(uuid, req.body);

      Logger.debug('Updating Client with uuid: %o', updatedClient?.uuid);
      return res.json(updatedClient);
    } catch (e: any) {
      next(e);
    }
  }

  async deleteClient(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;

    try {
      const deleteResult = await ClientService.deleteClient(uuid);

      Logger.debug('Deleted Client with uuid: %o', uuid);
      return res.json(deleteResult);
    } catch (e: any) {
      next(e);
    }
  }
}

export default new ClientController();
