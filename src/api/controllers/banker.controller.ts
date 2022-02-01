import { Request, Response } from 'express';

import Logger from '../../utils/logger';
import { BankerService } from '../../api/services/banker.service';

export default class BankerController {
  bankerServiceInstance = new BankerService();

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
}
