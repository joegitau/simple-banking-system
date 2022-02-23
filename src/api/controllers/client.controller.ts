import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';

import Cache from '../../utils/redis';
import Logger from '../../utils/logger';
import clientService from '../services/client.service';
import ClientService from '../services/client.service';
import { Client } from '../../api/entities/Client.entity';
import { TransactionType } from '../../api/entities/Transaction.entity';
import authenticationService from '../../api/services/authentication.service';
import { SearchQueryOptions } from '../../api/services/common/query-builder-options';
class ClientController {
  async registerClient(req: Request, res: Response, next: NextFunction) {
    try {
      const client = await ClientService.create(req.body)(
        getRepository(Client)
      );

      Logger.debug('Created Client with uuid: %o', client.uuid);
      return res.status(201).json(client);
    } catch (e: any) {
      next(e);
    }
  }

  async loginClient(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await authenticationService.login(
        email,
        password
      )(async (email) => await Client.findOneOrFail({ email }));

      // set refreshToken within res.cookie
      res.cookie('jwt', result.refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, // eq. 1 day
      });

      return res.status(201).json({
        accessToken: result.accessToken,
      });
    } catch (e: any) {
      next(e);
    }
  }

  async getClient(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;

    try {
      const cachedClient = await Cache.get(`client-${uuid}`);
      if (cachedClient) {
        return res.json(cachedClient);
      }

      const client = await clientService.get(uuid)(getRepository(Client));
      Logger.info(`::: Caching client with uuid, ${uuid.slice(0, 5)} :::`);
      await Cache.set(`client-${uuid}`, client);

      return res.json(client);
    } catch (e: any) {
      next(e);
    }
  }

  async getClients(_req: Request, res: Response, next: NextFunction) {
    try {
      const cachedClients = await Cache.get('clients');
      if (cachedClients) {
        return res.json(cachedClients);
      }

      const clients = await ClientService.getAll()(getRepository(Client));
      Logger.info('::: Caching clients... :::');
      await Cache.set('clients', clients);

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

      const cachedClient = await Cache.get(`clientTrans-${uuid}`);
      if (cachedClient) {
        return res.json(cachedClient);
      }

      const client = await ClientService.getCientAndTransactionsQB(
        queryOptions
      );
      Logger.info(
        `::: Caching clientTransaction with uuid, ${uuid.slice(0, 5)} :::`
      );
      await Cache.set(`clientTrans-${uuid}`, client);

      res.json(client);
    } catch (e: any) {
      next(e);
    }
  }

  // FIXME: - for some reason not working!
  async getClientBankersByQB(req: Request, res: Response, next: NextFunction) {
    try {
      const { uuid } = req.params;
      const queryOptions: SearchQueryOptions = { uuid };

      const cachedClient = await Cache.get(`clientBanker-${uuid}`);
      if (cachedClient) {
        return res.json(cachedClient);
      }

      const client = await ClientService.getClientAndBankersQB(queryOptions);
      Logger.info(
        `::: Caching clientBanker with uuid, ${uuid.slice(0, 5)} :::`
      );
      await Cache.set(`clientBanker-${uuid}`, client);

      res.json(client);
    } catch (e: any) {
      next(e);
    }
  }

  async updateClient(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;

    try {
      const updatedClient = await ClientService.update(uuid, req.body)(
        async (uuid) => await Client.findOneOrFail({ uuid }),
        getRepository(Client)
      );

      Logger.debug('Updating Client with uuid: %o', updatedClient?.uuid);
      return res.json(updatedClient);
    } catch (e: any) {
      next(e);
    }
  }

  async deleteClient(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;

    try {
      const deleteResult = await ClientService.delete(uuid)(
        async (uuid) => await Client.findOneOrFail({ uuid }),
        getRepository(Client)
      );

      Logger.debug('Deleted Client with uuid: %o', uuid);
      return res.json(deleteResult);
    } catch (e: any) {
      next(e);
    }
  }

  async logoutClient(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.sendStatus(204); // No content
    }

    const refreshToken = cookies.jwt;
    //we've verified cookie contains jwt -> clear cookie!
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    try {
      const client = await clientService.getClientByRefreshToken(refreshToken);
      if (!client) {
        res.clearCookie('jwt', {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        return res.sendStatus(204);
      }

      // delete refreshToken in DB
      client.token = '';
      const updatedClient = await client.save();

      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      // res.sendStatus(204); // client logged out -> No content required!
      res.status(201).json(updatedClient); // debug purposes!
    } catch (e: any) {
      next(e);
    }
  }
}

export default new ClientController();
