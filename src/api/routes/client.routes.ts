import { NextFunction, Request, Response, Router } from 'express';

import Logger from '../../utils/logger';

const router = Router();

export default (app: Router) => {
  app.use('/clients', router);

  router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    Logger.debug('Calling Clients end-point with body: %o', req.body);

    try {
      res.status(201).json('Nice!');
    } catch (e: any) {
      Logger.error('error: %o', e);
      return next(e);
    }
  });
};
