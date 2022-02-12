import { Banker } from '../api/entities/Banker.entity';
import { Client } from '../api/entities/Client.entity';
import { Person, Role } from '../api/entities/common/Person.entity';

declare global {
  namespace Express {
    export interface Request {
      currentUser: Person;
      roles: Role[];
    }
  }
}
