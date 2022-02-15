import { Request, Response, NextFunction } from 'express';

import Logger from '../../utils/logger';
import clientController from './client.controller';
import bankerController from './banker.controller';
import { ErrorMessage } from '../../utils/helpers/error-messages';
import authenticationService from '../../api/services/authentication.service';

class AuthenticationController {
  redirectUser(req: Request, res: Response, next: NextFunction) {
    if (req.query?.user_type === 'client') {
      Logger.info('::: Login client. :::');
      clientController.loginClient(req, res, next);
    } else {
      Logger.info('::: Login banker. :::');
      // bankerController.loginBanker; needs to be created!
    }
  }

  async setRefreshToken(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies;
    if (!cookies.jwt) {
      return res
        .status(401)
        .json({ error: { message: ErrorMessage.JWT_TOKEN_NOT_FOUND } });
    }

    const refreshToken = cookies.jwt;
    try {
      const newAccessToken = await authenticationService.setRefreshToken(
        refreshToken
      );

      Logger.debug('Generated new accessToken %o', newAccessToken);
      return res.json(newAccessToken);
    } catch (e: any) {
      next(e);
    }
  }
}

export default new AuthenticationController();
