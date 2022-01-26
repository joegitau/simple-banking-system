import express, { Application } from 'express';
import cors from 'cors';

import routes from '../../api/routes';

const expressLoader = (app: Application): void => {
  app.use(cors());
  app.use(express.json());

  // API routes
  app.use('/api', routes());
};

export default expressLoader;
