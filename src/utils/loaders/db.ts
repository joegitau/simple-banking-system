import { createConnection } from 'typeorm';

import config from '../../config';
import { Client } from '../../api/entities/client.entity';

const databaseConnection = async () => {
  const { DB_HOST, DB_PASSWORD, DB_USERNAME, DB_NAME } = config;

  await createConnection({
    type: 'postgres',
    host: DB_HOST,
    port: 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [Client],
    synchronize: true,
  });
};

export default databaseConnection;
