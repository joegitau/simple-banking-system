import { Request, Response } from 'express';

import Logger from '../../utils/logger';
import { BankerService } from '../../api/services/banker.service';
import { SuccessMessages } from '../../utils/helpers/success-messages';

export default class BankerController {
  async createBanker(req: Request, res: Response) {
    try {
      const bankerServiceInstance = new BankerService();
      const banker = await bankerServiceInstance.createBanker(req.body);

      Logger.debug('Created Banker with uuid: %o', banker?.uuid);
      return res.status(201).json(banker);
    } catch (e: any) {
      Logger.error(e);
    }
  }

  async getBanker(req: Request, res: Response) {
    const { uuid } = req.params;

    try {
      const bankerServiceInstance = new BankerService();
      const banker = await bankerServiceInstance.getBankerByUuid(uuid);

      res.json(banker);
    } catch (e: any) {
      Logger.error('Error %o', e.details);
    }
  }

  async getBankers(req: Request, res: Response) {
    try {
      const bankerServiceInstance = new BankerService();
      const bankers = await bankerServiceInstance.getBankers();

      res.json(bankers);
    } catch (e: any) {
      Logger.error('Error %o', e.details);
    }
  }

  async updateBanker(req: Request, res: Response) {
    try {
      const { uuid } = req.params;

      const bankerServiceInstance = new BankerService();
      const updatedBanker = await bankerServiceInstance.updateBanker(
        uuid,
        req.body
      );

      Logger.debug('Updating Banker with uuid: %o', updatedBanker?.uuid);
      res.json(updatedBanker);
    } catch (e: any) {
      Logger.error('Error %o', e.details);
    }
  }

  async connectBankerToClient(req: Request, res: Response) {
    try {
      const { bankerUuid, clientUuid } = req.params;
      Logger.info('banker & client UUIDs %o', { bankerUuid, clientUuid });

      const bankerServiceInstance = new BankerService();
      await bankerServiceInstance.connectBankerToClient(bankerUuid, clientUuid);

      Logger.debug(
        SuccessMessages.BANKER_CLIENT_CONNECTED(bankerUuid, clientUuid)
      );
      res.json({
        message: SuccessMessages.BANKER_CLIENT_CONNECTED(
          bankerUuid,
          clientUuid
        ),
      });
    } catch (e: any) {
      Logger.error('Error %o', e);
    }
  }
}
