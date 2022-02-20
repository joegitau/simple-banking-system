import { DeepPartial, DeleteResult } from 'typeorm';

import Logger from '../../utils/logger';
import ClientService from './client.service';
import { Banker } from '../../api/entities/Banker.entity';
import { ErrorMessage } from '../../utils/helpers/error-messages';
import { ServiceHelpers } from './common/service-helpers';

class BankerService {
  async registerBanker(input: Banker): Promise<Banker> {
    const hashedPassword = await ServiceHelpers.hashPassword(input);

    const banker = Banker.create({
      ...input,
      password: hashedPassword,
    });

    await banker.save();
    Reflect.deleteProperty(banker, 'password');

    return banker;
  }

  async getBankerByUuid(uuid: string): Promise<Banker> {
    const banker = await Banker.findOneOrFail({ uuid });

    return banker;
  }

  async getBankerByRefreshToken(
    refreshToken: string
  ): Promise<Banker | undefined> {
    return await Banker.findOne({ token: refreshToken });
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

    const client = await ClientService.getClientByUuid(clientUuid);

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

export default new BankerService();
