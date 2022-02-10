import { Banker } from '../api/entities/Banker.entity';
import { Client } from '../api/entities/Client.entity';
import { Person } from '../api/entities/common/Person.entity';

declare global {
  namespace Express {
    export interface Request {
      currentUser: Client | Banker;
    }
  }
}
