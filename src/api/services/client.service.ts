import { ObjectLiteral, RemoveOptions } from 'typeorm';

import { Client } from '../entities/Client.entity';

export class ClientService {
  // Create
  async createClient(input: ObjectLiteral): Promise<Client> {
    const client: Client = Client.create(input);
    await client.save();

    return client;
  }

  // getClient
  async getClient(uuid: string): Promise<Client> {
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
  async removeClient(
    uuid: string,
    removeOptions?: RemoveOptions
  ): Promise<string> {
    const client = await Client.findOneOrFail({ uuid });
    client.remove(removeOptions);

    return client.uuid;
  }

  // Utility
  hasKey<O>(obj: O, key: string | number | symbol): key is keyof O {
    return key in obj;
  }

  getProperty<T, K extends keyof T>(obj: T, propertyName: K): T[K] {
    return obj[propertyName]; // o[propertyName] is of type T[K]
  }
}
