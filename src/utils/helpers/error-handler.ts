import { NextFunction, Request, Response } from 'express';

export class ErrorHandler extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleNotFoundErr = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const err = new ErrorHandler(404, 'Not Found.');
  next(err);
};

export const handleError = (err: ErrorHandler, res: Response) => {
  const { statusCode, message } = err;

  res.status(statusCode || 500).json({
    errors: { message },
  });
};
