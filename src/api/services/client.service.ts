import argon2 from 'argon2';
import {
  createQueryBuilder,
  DeepPartial,
  getRepository,
  ObjectLiteral,
  Repository,
} from 'typeorm';

import config from '../../config';
import JWTHelpers from '../../api/jwt';
import { UserEntity } from '../../types';
import { CRUDService } from './CRUD.service';
import { Client } from '../entities/Client.entity';
import { ServiceHelpers } from './common/service-helpers';
import { ErrorHandler } from '../../utils/helpers/error-handler';
import { ErrorMessage } from '../../utils/helpers/error-messages';
import { SearchQueryOptions } from './common/query-builder-options';
import { Banker } from '../entities/Banker.entity';
import { Transaction } from '../entities/Transaction.entity';
class ClientService extends CRUDService {
  // override getAll(): (entity: Repository<UserEntity>) => Promise<UserEntity[]> {
  //   return async (entity: Repository<UserEntity>) => {
  //     entity = getRepository(Client);

  //     const clients = await entity.find();
  //     clients.forEach((client) => Reflect.deleteProperty(client, 'password'));

  //     return clients;
  //   };
  // }

  async loginClient(
    email: string,
    password: string
  ): Promise<{
    client: Client;
    accessToken: string;
    refreshToken: string;
  }> {
    const client = await Client.findOneOrFail({ email });

    const validPassword = await argon2.verify(client.password, password);

    if (!validPassword) {
      throw new ErrorHandler(401, ErrorMessage.INVALID_EMAIL_PASSWORD);
    }

    const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = config;

    const accessToken = JWTHelpers.generateToken(client, {
      secret: ACCESS_TOKEN_SECRET,
      expiry: '300s',
    });

    const refreshToken = JWTHelpers.generateToken(client, {
      secret: REFRESH_TOKEN_SECRET,
      expiry: '1d',
    });

    // save refreshTokens with currentUser
    client.token = refreshToken;
    await client.save();

    Reflect.deleteProperty(client, 'password');

    return { client, accessToken, refreshToken };
  }

  //////////////////////////
  // advanced select queries
  //////////////////////////

  async getClientAndBankersQB(options: SearchQueryOptions): Promise<Client> {
    return await createQueryBuilder('clients')
      .select('client')
      .from(Client, 'client')
      .leftJoinAndSelect('client.bankers', 'bankers')
      .where('client.uuid = :uuid', { uuid: options.uuid })
      .getOneOrFail();
  }

  // prettier-ignore
  async getCientAndTransactionsQB(options: SearchQueryOptions): Promise<Client> {
    return await createQueryBuilder('clients')
      .select('client')
      .from(Client, 'client')
      .leftJoinAndSelect('client.transactions', 'transactions')
      .where('client.uuid = :uuid', { uuid: options.uuid })
      // .andWhere('transactions.type = :type', { type: options.transactionType })
      .getOneOrFail();
  }

  async getClientByRefreshToken(
    rereshToken: string
  ): Promise<Client | undefined> {
    return await createQueryBuilder('clients')
      .select('client')
      .from(Client, 'client')
      .where('client.token = :token', { token: rereshToken })
      .getOne();
  }

  async updateClient(uuid: string, fields: ObjectLiteral): Promise<Client> {
    const client = await Client.findOneOrFail({ uuid });

    Client.merge(client, fields);
    const updatedClient = await Client.save(client);

    return updatedClient;
  }

  async deleteClient(uuid: string) {
    const client = await this.get(uuid)(getRepository(Client));

    return await Client.delete(client.id);
  }
}

export default new ClientService();
