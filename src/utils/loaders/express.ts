import express, { Application, NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import Logger from '../logger';
import routes from '../../api/routes';
import {
  ErrorHandler,
  handleError,
  handleNotFoundErr,
} from '../../utils/helpers/error-handler';
import { corsOptions } from '../../utils/helpers/allowed-origins';
import CorsAccessCredentials from '../../api/middleware/cors-credentials';

const expressLoader = (app: Application): void => {
  app.use(CorsAccessCredentials);
  // FIXME: add corsOptions
  // app.use(cors(corsOptions));

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  // API routes
  app.use('/api', routes);

  // handle errors
  app.use(handleNotFoundErr);
  app.use(
    (err: ErrorHandler, _req: Request, res: Response, _next: NextFunction) => {
      Logger.error('Error: %o', err);
      handleError(err, res);
    }
  );
};

export default expressLoader;
