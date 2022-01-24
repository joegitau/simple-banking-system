import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFileFound = dotenv.config();
if (envFileFound.error) throw new Error('Please provide an .env file.');

export default {
  PORT: parseInt(process.env.PORT as string, 10),
  DB_URI: process.env.DB_URI,

  // winston logger configs
  LOGS: {
    LEVEL: process.env.LOG_LEVEL || 'silly',
  },
};
