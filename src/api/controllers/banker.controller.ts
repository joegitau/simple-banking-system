import { NextFunction, Request, Response } from 'express';

import Logger from '../../utils/logger';
import { BankerService } from '../../api/services/banker.service';
import { SuccessMessages } from '../../utils/helpers/success-messages';

export default class BankerController {
  async createBanker(req: Request, res: Response, next: NextFunction) {
    try {
      const bankerServiceInstance = new BankerService();
      const banker = await bankerServiceInstance.createBanker(req.body);

      Logger.debug('Created Banker with uuid: %o', banker?.uuid);
      return res.status(201).json(banker);
    } catch (e: any) {
      next(e);
    }
  }

  async getBanker(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;

    try {
      const bankerServiceInstance = new BankerService();
      const banker = await bankerServiceInstance.getBankerByUuid(uuid);

      return res.json(banker);
    } catch (e: any) {
      next(e);
    }
  }

  async getBankers(_: Request, res: Response, next: NextFunction) {
    try {
      const bankerServiceInstance = new BankerService();
      const bankers = await bankerServiceInstance.getBankers();

      return res.json(bankers);
    } catch (e: any) {
      next(e);
    }
  }

  async updateBanker(req: Request, res: Response, next: NextFunction) {
    try {
      const { uuid } = req.params;

      const bankerServiceInstance = new BankerService();
      const updatedBanker = await bankerServiceInstance.updateBanker(
        uuid,
        req.body
      );

      Logger.debug('Updating Banker with uuid: %o', updatedBanker?.uuid);
      return res.json(updatedBanker);
    } catch (e: any) {
      next(e);
    }
  }

  async connectBankerToClient(req: Request, res: Response, next: NextFunction) {
    try {
      const { bankerUuid, clientUuid } = req.params;
      Logger.info('banker & client UUIDs %o', { bankerUuid, clientUuid });

      const bankerServiceInstance = new BankerService();
      await bankerServiceInstance.connectBankerToClient(bankerUuid, clientUuid);

      Logger.debug(
        SuccessMessages.BANKER_CLIENT_CONNECTED(bankerUuid, clientUuid)
      );
      return res.json({
        message: SuccessMessages.BANKER_CLIENT_CONNECTED(
          bankerUuid,
          clientUuid
        ),
      });
    } catch (e: any) {
      next(e);
    }
  }

  async deleteBanker(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;

    try {
      const bankerServiceInstance = new BankerService();

      const deleteResult = await bankerServiceInstance.deleteBanker(uuid);

      Logger.debug('Deleted Client with uuid: %o', uuid);
      return res.json(deleteResult);
    } catch (e: any) {
      next(e);
    }
  }
}
