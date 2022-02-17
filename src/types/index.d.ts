import { Banker } from '../api/entities/Banker.entity';
import { Client } from '../api/entities/Client.entity';
import { Role } from '../api/entities/common/Person.entity';

export type UserEntity = Banker | Client;
declare global {
  namespace Express {
    export interface Request {
      currentUser: UserEntity;
      role: Role;
    }
  }
}
