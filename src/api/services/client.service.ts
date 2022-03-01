import { createQueryBuilder, getRepository, ObjectLiteral } from 'typeorm';

import { CRUDService } from './CRUD.service';
import { Client } from '../entities/Client.entity';
import { SearchQueryOptions } from './common/query-builder-options';
class ClientService extends CRUDService {
  // override getAll(): (entity: Repository<UserEntity>) => Promise<UserEntity[]> {
  //   return async (entity: Repository<UserEntity>) => {
  //     entity = getRepository(Client);

  //     const clients = await entity.find();
  //     clients.forEach((client) => Reflect.deleteProperty(client, 'password'));

  //     return clients;
  //   };
  // }

  //////////////////////////
  // advanced select queries
  //////////////////////////

  async getClientAndBankersQB(
    options: SearchQueryOptions
  ): Promise<Client | undefined> {
    return await createQueryBuilder('clients')
      .select('client')
      .from(Client, 'client')
      .leftJoinAndSelect('client.bankers', 'bankers')
      .where('client.uuid = :uuid', { uuid: options.uuid })
      .cache({ id: 'clients_bankers' })
      .getOne();
  }

  async getCientAndTransactionsQB(
    options: SearchQueryOptions
  ): Promise<Client | undefined> {
    return await createQueryBuilder('clients')
      .select('client')
      .from(Client, 'client')
      .leftJoinAndSelect('client.transactions', 'transactions')
      .where('client.uuid = :uuid', { uuid: options.uuid })
      .cache({ id: 'clients_transactions' })
      // .andWhere('transactions.type = :type', { type: options.transactionType })
      .getOne();
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
}

export default new ClientService();
