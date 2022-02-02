import { DeleteResult, ObjectLiteral, RemoveOptions } from 'typeorm';

import { Client } from '../entities/Client.entity';
import Logger from '../../utils/logger';
export class ClientService {
  // Create
  async createClient(input: ObjectLiteral): Promise<Client> {
    const client: Client = Client.create(input);
    await client.save();

    return client;
  }

  // getClient
  async getClientByUuid(uuid: string): Promise<Client> {
    return await Client.findOneOrFail({ uuid });
  }

  // getAllClients
  async getClients(): Promise<Client[]> {
    return await Client.find();
  }

  // Update
  async updateClient(uuid: string, fields: ObjectLiteral): Promise<Client> {
    const client = await Client.findOneOrFail({ uuid });

    // Object.keys(fields).forEach((key) => {
    //   if (!!fields[key]) {
    //     client[key] = fields[key];
    //   }
    // });

    Client.merge(client, fields);
    const updatedClient = await Client.save(client);

    return updatedClient;
  }

  // Delete
  async deleteClient(uuid: string) {
    const client = await this.getClientByUuid(uuid);

    return await Client.delete(client.id);
  }
}
