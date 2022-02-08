import argon2 from 'argon2';
import { createQueryBuilder, ObjectLiteral } from 'typeorm';

import { Client } from '../entities/Client.entity';
import { ServiceHelpers } from './common/service-helpers';
import { ErrorHandler } from '../../utils/helpers/error-handler';
import { ErrorMessage } from '../../utils/helpers/error-messages';
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

  async registerClient(input: Client) {
    const hashedPassword = await ServiceHelpers.hashPassword(input);

    const client = Client.create({
      ...input,
      password: hashedPassword,
    });

    await client.save();
    Reflect.deleteProperty(client, 'password');

    const token = ServiceHelpers.generateToken(client);

    return { client, token };
  }

  async loginClient(email: string, password: string) {
    const client = await Client.findOneOrFail({ email });

    const validPassword = await argon2.verify(client.password, password);

    if (!validPassword) {
      throw new ErrorHandler(401, ErrorMessage.INVALID_EMAIL_PASSWORD);
    }

    const token = ServiceHelpers.generateToken(client);

    Reflect.deleteProperty(client, 'password');

    return { client, token };
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
