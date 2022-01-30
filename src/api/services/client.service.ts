import { DeepPartial, ObjectLiteral } from 'typeorm';

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
  // async updateClient(
  //   uuid: string,
  //   fields: ObjectLiteral
  // ): Promise<Client> {
  //   const updateableFields: DeepPartial<Client> = {};

  //   const client = await Client.findOneOrFail({ uuid });

  //   Object.keys(updateableFields).forEach((key) => {
  //     if (!!fields[key]) {
  //       client[key] = fields[key];
  //     }
  //   });
  // }

  // Delete

  // Utility
  hasKey<O>(obj: O, key: string | number | symbol): key is keyof O {
    return key in obj;
  }

  getProperty<T, K extends keyof T>(obj: T, propertyName: K): T[K] {
    return obj[propertyName]; // o[propertyName] is of type T[K]
  }
}
