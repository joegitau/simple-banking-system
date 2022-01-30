import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import Logger from '../logger';
import routes from '../../api/routes';
import { ErrorHandler, handleError } from '../../utils/helpers/error-handler';

const expressLoader = (app: Application): void => {
  app.use(cors());
  app.use(express.json());

  // API routes
  app.use('/api', routes);

  // handle errors
  app.use(
    (err: ErrorHandler, _: Request, res: Response, next: NextFunction) => {
      Logger.error('Error: %o', err.message);
      handleError(err, res);
    }
  );
};

export default expressLoader;
