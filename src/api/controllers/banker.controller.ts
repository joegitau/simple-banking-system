import { NextFunction, Request, Response } from 'express';

import Logger from '../../utils/logger';
import { Banker } from '../../api/entities/Banker.entity';
import BankerService from '../../api/services/banker.service';
import { SuccessMessage } from '../../utils/helpers/success-messages';
import authenticationService from '../../api/services/authentication.service';
class BankerController {
  async createBanker(req: Request, res: Response, next: NextFunction) {
    try {
      const banker = await BankerService.createBanker(req.body);

      Logger.debug('Created Banker with uuid: %o', banker?.uuid);
      return res.status(201).json(banker);
    } catch (e: any) {
      next(e);
    }
  }

  async loginBanker(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await authenticationService.login(
        email,
        password
      )(async (email) => await Banker.findOneOrFail({ email }));

      // set refreshToken within res.cookie
      res.cookie('jwt', result.refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000, // eq. 1 day
      });

      return res.status(201).json({
        accessToken: result.accessToken,
      });
    } catch (e: any) {
      next(e);
    }
  }

  async getBanker(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;

    try {
      const banker = await BankerService.getBankerByUuid(uuid);

      return res.json(banker);
    } catch (e: any) {
      next(e);
    }
  }

  async getBankers(_: Request, res: Response, next: NextFunction) {
    try {
      const bankers = await BankerService.getBankers();

      return res.json(bankers);
    } catch (e: any) {
      next(e);
    }
  }

  async updateBanker(req: Request, res: Response, next: NextFunction) {
    try {
      const { uuid } = req.params;

      const updatedBanker = await BankerService.updateBanker(uuid, req.body);

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

      await BankerService.connectBankerToClient(bankerUuid, clientUuid);

      Logger.debug(
        SuccessMessage.BANKER_CLIENT_CONNECTED(bankerUuid, clientUuid)
      );
      return res.json({
        message: SuccessMessage.BANKER_CLIENT_CONNECTED(bankerUuid, clientUuid),
      });
    } catch (e: any) {
      next(e);
    }
  }

  async deleteBanker(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;

    try {
      const deleteResult = await BankerService.deleteBanker(uuid);

      Logger.debug('Deleted Client with uuid: %o', uuid);
      return res.json(deleteResult);
    } catch (e: any) {
      next(e);
    }
  }

  async logoutBanker(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.sendStatus(204); // No content
    }

    const refreshToken = cookies.jwt;
    //we've verified cookie contains jwt -> clear cookie!
    res.clearCookie(refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    try {
      const result = await authenticationService.logout(refreshToken)(
        async (refreshToken: string) =>
          await Banker.findOneOrFail({ token: refreshToken })
      );

      // clear found user's cookie
      res.clearCookie(refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      // res.sendStatus(204); // user logged out -> No content required!
      res.status(201).json(result); // debug purposes!
    } catch (e: any) {
      next(e);
    }
  }
}

export default new BankerController();
