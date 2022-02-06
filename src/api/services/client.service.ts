import { createQueryBuilder, ObjectLiteral } from 'typeorm';

import { Client } from '../entities/Client.entity';
import { SearchQueryOptions } from './common/query-builder-options';
class ClientService {
  async createClient(input: ObjectLiteral): Promise<Client> {
    const client: Client = Client.create(input);
    await client.save();

    return client;
  }

  async getClientByUuid(uuid: string): Promise<Client> {
    return await Client.findOneOrFail({ uuid });
  }

  async getClients(): Promise<Client[]> {
    return await Client.find();
  }

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
  async getCientAndTransactionsQB(options: SearchQueryOptions) {
    return await createQueryBuilder('clients')
      .select('client')
      .from(Client, 'client')
      .leftJoinAndSelect('client.transactions', 'transactions')
      .where('client.uuid = :uuid', { uuid: options.uuid })
      // .andWhere('transactions.type = :type', { type: options.transactionType })
      .getOneOrFail();
  }

  async updateClient(uuid: string, fields: ObjectLiteral): Promise<Client> {
    const client = await Client.findOneOrFail({ uuid });

    Client.merge(client, fields);
    const updatedClient = await Client.save(client);

    return updatedClient;
  }

  async deleteClient(uuid: string) {
    const client = await this.getClientByUuid(uuid);

    return await Client.delete(client.id);
  }
}

export default new ClientService();
