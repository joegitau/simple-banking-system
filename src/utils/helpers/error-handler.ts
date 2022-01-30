import { Response } from 'express';

export class ErrorHandler {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = async (err: ErrorHandler, res: Response) => {
  const { statusCode, message } = err;

  res.status(statusCode).json({
    error: message,
  });
};
