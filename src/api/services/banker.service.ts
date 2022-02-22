import Logger from '../../utils/logger';
import { CRUDService } from './CRUD.service';
import { Client } from '../entities/Client.entity';
import { Banker } from '../../api/entities/Banker.entity';
import { ErrorMessage } from '../../utils/helpers/error-messages';

class BankerService extends CRUDService {
  async getBankerByRefreshToken(
    refreshToken: string
  ): Promise<Banker | undefined> {
    return await Banker.findOne({ token: refreshToken });
  }

  async connectBankerToClient(bankerUuid: string, clientUuid: string) {
    const banker = await Banker.findOneOrFail({ uuid: bankerUuid });

    const client = await Client.findOneOrFail({ uuid: clientUuid });

    if (!banker || !client) {
      Logger.error(ErrorMessage.NO_CLIENT_OR_BANKER_EXISTS);
      return false;
    }

    banker.clients = [client];
    banker.save();
  }
}

export default new BankerService();
