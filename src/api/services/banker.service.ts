import { DeepPartial, DeleteResult, ObjectLiteral } from 'typeorm';

import Logger from '../../utils/logger';
import { ClientService } from './client.service';
import { Banker } from '../../api/entities/Banker.entity';
import { ErrorMessage } from '../../utils/helpers/error-messages';

export class BankerService {
  async createBanker(input: ObjectLiteral): Promise<Banker> {
    const banker = Banker.create(input);

    await banker.save();
    return banker;
  }

  async getBankerByUuid(uuid: string): Promise<Banker> {
    const banker = await Banker.findOneOrFail({ uuid });

    return banker;
  }

  async getBankers(): Promise<Banker[]> {
    return await Banker.find();
  }

  async updateBanker(
    reference: string,
    fields: DeepPartial<Banker>
  ): Promise<Banker> {
    const banker = await Banker.findOneOrFail({ uuid: reference });

    const updatedBanker = Banker.merge(banker, fields);
    updatedBanker.save();

    return updatedBanker;
  }

  async connectBankerToClient(bankerUuid: string, clientUuid: string) {
    const banker = await this.getBankerByUuid(bankerUuid);

    const clientServiceInstance = new ClientService();
    const client = await clientServiceInstance.getClientByUuid(clientUuid);

    if (!banker || !client) {
      Logger.error(ErrorMessage.NO_CLIENT_OR_BANKER_EXISTS);
      return false;
    }

    banker.clients = [client];
    banker.save();
  }

  async deleteBanker(uuid: string): Promise<DeleteResult> {
    const banker = await this.getBankerByUuid(uuid);

    return await Banker.delete(banker.id);
  }
}
