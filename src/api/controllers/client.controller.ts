import { Request, Response, NextFunction } from 'express';

import Logger from '../../utils/logger';
import { ClientService } from '../services/client.service';
import { ErrorHandler } from '../../utils/helpers/error-handler';
import { ErrorMessage } from '../../utils/helpers/error-messages';

const clientInstance = new ClientService();

export const createClientController = async (
  req: Request,
  res: Response,
  _: NextFunction
) => {
  Logger.debug('Creating Client with body: %o', req.body);

  try {
    const client = await clientInstance.createClient(req.body);
    return res.status(201).json(client);
  } catch (e: any) {
    Logger.error('Error: %o', e.detail);
    throw new ErrorHandler(401, ErrorMessage.CLIENT_EXISTS);
    // return next(e);
  }
};

export const getClientController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  try {
    const client = await clientInstance.getClient(uuid);
    return res.json(client);
  } catch (e: any) {
    Logger.error('Error: %o', e.detail);
    throw new ErrorHandler(401, ErrorMessage.NO_CLIENT_EXIST(uuid));
  }
};

export const getClientsController = async (req: Request, res: Response) => {
  try {
    const clients = await clientInstance.getClients();
    return res.json(clients);
  } catch (e: any) {
    Logger.error('Error: %o', e.detail);
    throw new ErrorHandler(401, ErrorMessage.NO_CLIENTS_EXIST);
  }
};

export const updateClientController = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const { firstname, lastname, email, cardNumber, balance, hobbies } = req.body;

  try {
    // const client = await Client.findOneOrFail({ uuid });

    /* client.firstname = firstname || client.firstname;
    client.lastname = lastname || client.lastname;
    client.email = email || client.email;
    client.cardNumber = cardNumber || client.cardNumber;
    client.balance = balance || client.balance;
    client.hobbies = hobbies || client.hobbies;

    await client.save(); */

    // const clientInstance = new ClientService();
    const updatedClient = await clientInstance.updateClient(uuid, req.body);

    return res.json(updatedClient);
  } catch (e: any) {
    Logger.error('Error: %o', e.detail);
    throw new ErrorHandler(401, ErrorMessage.NO_CLIENT_EXIST(uuid));
  }
};

export const deleteClientController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  try {
    const client = clientInstance.removeClient(uuid);
    res.json(client);
  } catch (e: any) {
    Logger.error('Error: %o', e.detail);
    throw new ErrorHandler(401, ErrorMessage.NO_CLIENT_EXIST(uuid));
  }
};
