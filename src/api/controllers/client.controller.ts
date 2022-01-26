import { Request, Response, NextFunction } from 'express';

import { Client } from '../entities/Client.entity';
import Logger from '../../utils/logger';

export const createClientController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Logger.debug('Creating Client with body: %o', req.body);

  try {
    const {
      firstname,
      lastname,
      email,
      cardNumber,
      accountBalance,
      hobbies,
      additionalInfo,
    } = req.body;

    const client: Client = Client.create({
      firstname,
      lastname,
      email,
      card_number: cardNumber,
      account_balance: accountBalance,
      hobbies,
      additional_info: additionalInfo,
    });

    await client.save();

    return res.status(201).json(client);
  } catch (e: any) {
    Logger.error('error: %o', e);
    return next(e);
  }
};
