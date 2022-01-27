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
      balance,
      hobbies,
      additionalInfo,
    } = req.body;

    const client: Client = Client.create({
      firstname,
      lastname,
      email,
      cardNumber,
      balance,
      hobbies,
      additionalInfo,
    });

    await client.save();

    return res.status(201).json(client);
  } catch (e: any) {
    Logger.error('error: %o', e);
    return res.status(500).json({ message: 'Something shitty went down!' });
    // return next(e); // we should create some generic error handler
  }
};

export const getClientController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  try {
    const client = await Client.findOneOrFail({ uuid });

    return res.json(client);
  } catch (e: any) {
    Logger.error('error: %o', e);
    return res.status(401).json({ message: 'Client not found!' });
  }
};

export const fetchClientsController = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    return res.json(clients);
  } catch (e: any) {
    Logger.error('error: %o', e);
    return res.status(401).json({ message: 'Clients not found!' });
  }
};

export const updateClientController = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const { firstname, lastname, email, cardNumber, balance, hobbies } = req.body;

  try {
    const client = await Client.findOneOrFail({ uuid });

    client.firstname = firstname || client.firstname;
    client.lastname = lastname || client.lastname;
    client.email = email || client.email;
    client.cardNumber = cardNumber || client.cardNumber;
    client.balance = balance || client.balance;
    client.hobbies = hobbies || client.hobbies;

    await client.save();

    return res.json(client);
  } catch (e: any) {
    Logger.error('error: %o', e);
    return res.status(401).json({ message: 'Client not found!' });
  }
};

export const deleteClientController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  try {
    const client = await Client.findOneOrFail({ uuid });
    client.remove();

    res.json({ message: 'Client successfully deleted!' });
  } catch (e: any) {
    Logger.error('error: %o', e);
    return res.status(401).json({ message: 'Client not found!' });
  }
};
