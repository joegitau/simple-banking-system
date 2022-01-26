import e, { Request, Response, NextFunction } from 'express';

import { Banker } from '../entities/Banker.entity';
import Logger from '../../utils/logger';

export const createBankerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Logger.debug('Creating Banker with body: %o', req.body);

  try {
    // dude, we gotta add validation!
    const { firstname, lastname, email, employeeNumber } = req.body;
    const banker = Banker.create({
      firstname,
      lastname,
      email,
      employee_number: employeeNumber,
    });

    await banker.save();

    return res.status(201).json(banker);
  } catch (e: any) {
    Logger.error(e);
    return next(e);
  }
};
