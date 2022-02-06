import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest =
  (inputReq: AnyZodObject) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      inputReq.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });

      next();
    } catch (e: any) {
      next(e);
    }
  };

export default validateRequest;
