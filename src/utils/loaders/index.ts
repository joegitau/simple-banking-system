import { Application } from 'express';

import loadExpress from './express';
import Logger from '../logger';
import loadDB from './db';

export default async (app: Application): Promise<void> => {
  try {
    await loadDB();
    Logger.info('::: Connected to Database. ::: ');
  } catch (e: any) {
    Logger.error(e);
    throw e;
  }

  // load expresss
  loadExpress(app);
  Logger.info('::: App Initialised. :::');
};
