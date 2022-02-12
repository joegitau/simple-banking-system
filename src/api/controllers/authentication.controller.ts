import { Request, Response, NextFunction } from 'express';

import Logger from '../../utils/logger';
import authenticationService from '../../api/services/authentication.service';

class AuthenticationController {
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const result = await authenticationService.login(email, password);

      // set refreshToken within current user's res.cookies
      res.cookie('jwt', result.refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        sameSite: 'none',
      });

      Logger.silly('::: Loging in user...');
      res.json({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    } catch (e: any) {
      next(e);
    }
  }
}

export default new AuthenticationController();
