import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFileFound = dotenv.config();
if (envFileFound.error) throw new Error('Please provide an .env file.');

export default {
  PORT: parseInt(process.env.PORT as string, 10),

  // database
  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,

  // JWT
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,

  // winston logger configs
  LOGS: {
    LEVEL: process.env.LOG_LEVEL || 'silly',
  },

  // Redis
  REDIS_PORT: Number(process.env.REDIS_PORT as string),
  REDIS_HOST: process.env.REDIS_HOST as string,
};
