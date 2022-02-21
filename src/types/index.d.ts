import { Banker } from '../api/entities/Banker.entity';
import { Client } from '../api/entities/Client.entity';
import { Role } from '../api/entities/common/Person.entity';
import { Transaction } from '../api/entities/Transaction.entity';

export type UserEntity = Banker | Client;

export type AppEntity = Client | Banker | Transaction;
declare global {
  namespace Express {
    export interface Request {
      currentUser: UserEntity;
      role: Role;
    }
  }
}
