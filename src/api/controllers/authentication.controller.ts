import { Request, Response, NextFunction } from 'express';

import JWTHelpers from '../jwt';
import config from '../../config';
import Logger from '../../utils/logger';
import clientController from './client.controller';
import bankerController from './banker.controller';
import clientService from '../../api/services/client.service';
import { ErrorHandler } from '../../utils/helpers/error-handler';
import { ErrorMessage } from '../../utils/helpers/error-messages';

class AuthenticationController {
  redirectUserLogin(req: Request, res: Response, next: NextFunction) {
    if (req.query?.user_type === 'client') {
      Logger.info('::: Login client. :::');
      clientController.loginClient(req, res, next);
    } else {
      Logger.info('::: Login banker. :::');
      // FIXME: add loginBanker within bankerController
      // bankerController.loginBanker; needs to be created!
    }
  }

  async setRefreshToken(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res
        .status(401)
        .json({ error: { message: ErrorMessage.JWT_TOKEN_NOT_FOUND } });
    }

    const refreshToken = cookies.jwt;
    Logger.debug('AUTH:: refreshToken %o', refreshToken);

    // find user associated with respective refreshToken
    // TODO: transform user to generic UserType (Client | Banker)
    const user = await clientService.getClientByRefreshToken(refreshToken);

    if (!user) {
      throw new ErrorHandler(403, ErrorMessage.FORBIDDEN);
    }

    try {
      JWTHelpers.verifyToken(
        refreshToken,
        { secret: config.REFRESH_TOKEN_SECRET },
        (err: any, decoded: any) => {
          if (err || user?.uuid !== decoded.uuid) {
            throw new ErrorHandler(403, ErrorMessage.FORBIDDEN);
          }

          const newAccessToken = JWTHelpers.generateToken(user, {
            expiry: '300s',
            secret: config.ACCESS_TOKEN_SECRET,
          });

          Logger.debug('Generated new accessToken %o', newAccessToken);
          return res.json(newAccessToken);
        }
      );
    } catch (e: any) {
      next(e);
    }
  }

  redirectUserLogout(req: Request, res: Response, next: NextFunction) {
    if (req.query?.user_type === 'client') {
      Logger.info('::: Logout client. :::');
      clientController.logoutClient(req, res, next);
    } else {
      Logger.info('::: Logout banker. :::');
      // FIXME: add logoutBanker within bankerController
      // bankerController.logoutBanker; needs to be created!
    }
  }
}

export default new AuthenticationController();
