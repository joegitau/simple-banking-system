import { NextFunction, Request, Response } from 'express';

import config from '../../config';
import JWTHelpers from '../../api/jwt';
import Logger from '../../utils/logger';
import { ErrorHandler } from '../../utils/helpers/error-handler';
import { ErrorMessage } from '../../utils/helpers/error-messages';

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (token == null) {
    throw new ErrorHandler(401, ErrorMessage.TOKEN_NOT_FOUND);
  }

  JWTHelpers.verifyToken(
    token,
    { secret: config.ACCESS_TOKEN_SECRET },
    (err: any, decoded: any) => {
      if (err) {
        throw new ErrorHandler(403, ErrorMessage.INVALID_ACCESS_TOKEN);
      }

      // attach currentUser & role to decoded accessToken Payload
      // decodedPayload => userInfo: { uuid: user.uuid, role: user.role },
      req.currentUser = decoded;
      // req.role = decoded.role; // not necessary?

      Logger.debug('::: Attaching currentUser to payload %o', decoded);

      next();
    }
  );
};

export default isAuth;
