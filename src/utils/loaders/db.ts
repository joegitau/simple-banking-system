import { createConnection } from 'typeorm';

import { Transaction } from '../../api/entities/Transaction.entity';
import { Client } from '../../api/entities/Client.entity';
import { Banker } from '../../api/entities/Banker.entity';
import config from '../../config';

const databaseConnection = async () => {
  const { DB_HOST, DB_PASSWORD, DB_USERNAME, DB_NAME } = config;

  await createConnection({
    type: 'postgres',
    host: DB_HOST,
    port: 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [Client, Banker, Transaction],
    synchronize: true,
  });
};

export default databaseConnection;
