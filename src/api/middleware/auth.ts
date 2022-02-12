import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import config from '../../config';
import Logger from '../../utils/logger';
import { JWTHelpers } from '../../api/jwt';
import { ErrorHandler } from '../../utils/helpers/error-handler';
import { ErrorMessage } from '../../utils/helpers/error-messages';

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (token == null) throw new ErrorHandler(401, ErrorMessage.TOKEN_NOT_FOUND);

  jwt.verify(
    token,
    config.ACCESS_TOKEN_SECRET,
    { algorithms: ['HS256'] },
    (err: any, decoded: any) => {
      if (err) {
        throw new ErrorHandler(403, ErrorMessage.INVALID_ACCESS_TOKEN);
      }

      // attach currentUser to decoded accessToken Payload
      // decodedPayload => uuid & role
      req.currentUser = decoded;
      Logger.debug('::: Attaching currentUser to payload %o', decoded);

      next();
    }
  );
};

export default isAuth;
