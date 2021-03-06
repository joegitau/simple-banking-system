import 'reflect-metadata';

import express from 'express';

import Logger from './utils/logger';
import config from './config';

const initApp = async () => {
  const app = express();

  try {
    const loaders = await import('../src/utils/loaders');
    await loaders.default(app);
  } catch (e: any) {
    Logger.error(e);
    Logger.error(
      ':_: Initializing loaders failed. Server shutting down... :_:'
    );
    return;
  }

  app
    .listen(config.PORT, () => {
      Logger.info(`::: App running on http://localhost:${config.PORT} :::`);
    })
    .on('error', (err) => {
      Logger.error(err);
      process.exit(1);
    });
};

initApp();
