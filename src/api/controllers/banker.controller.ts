import { Request, Response } from 'express';

import Logger from '../../utils/logger';
import { BankerService } from '../../api/services/banker.service';

export default class BankerController {
  protected bankerServiceInstance = new BankerService();

  async createBanker(req: Request, res: Response) {
    Logger.debug('Creating Banker with body: %o', req.body);

    try {
      const banker = await this.bankerServiceInstance.createBanker(req.body);
      return res.status(201).json(banker);
    } catch (e: any) {
      Logger.error(e);
    }
  }

  async getBanker(req: Request, res: Response) {
    const { uuid } = req.params;

    try {
      const banker = this.bankerServiceInstance.getBankerByUuid(uuid);
      res.json(banker);
    } catch (e: any) {
      Logger.error('Error %o', e.details);
    }
  }

  async getBankers(req: Request, res: Response) {
    try {
      const bankers = await this.bankerServiceInstance.getBankers();
      res.json(bankers);
    } catch (e: any) {
      Logger.error('Error %o', e.details);
    }
  }

  async updateBanker(req: Request, res: Response) {
    try {
      const { uuid } = req.params;

      const updatedBanker = this.bankerServiceInstance.updateBanker(
        uuid,
        req.body
      );
      res.json(updatedBanker);
    } catch (e: any) {
      Logger.error('Error %o', e.details);
    }
  }
}
