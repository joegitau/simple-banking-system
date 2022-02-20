import { NextFunction, Request, Response } from 'express';

import { allowedOrigins } from '../../utils/helpers/allowed-origins';

const CorsAccessCredentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { origin } = req.headers;
  if (allowedOrigins.includes(origin as string)) {
    // res.header('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Credentials', 'true');
  }

  next();
};

export default CorsAccessCredentials;
