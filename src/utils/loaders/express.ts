import cors from 'cors';
import express, { Application } from 'express';

const expressLoader = (app: Application): void => {
  app.use(cors());
  app.use(express.json());
};

export default expressLoader;
