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
  try {
    const client = await clientInstance.createClient(req.body);

    Logger.debug('Created Client with uuid: %o', client?.uuid);
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
    const client = await clientInstance.getClientByUuid(uuid);
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

  try {
    const updatedClient = await clientInstance.updateClient(uuid, req.body);

    Logger.debug('Updating Client with uuid: %o', updatedClient?.uuid);
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

    Logger.debug('Updating Client with uuid: %o', uuid);
    res.json(client);
  } catch (e: any) {
    Logger.error('Error: %o', e.detail);
    throw new ErrorHandler(401, ErrorMessage.NO_CLIENT_EXIST(uuid));
  }
};
