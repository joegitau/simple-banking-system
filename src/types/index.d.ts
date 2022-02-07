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

export interface InputDTO extends Person {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface IClientResponseDTO {
  client: Client;
  token: string;
}

export interface IClientResponseDTO {
  client: Client;
  token: string;
}

export interface IBankerResponseDTO {
  banker: Banker;
  token: string;
}
