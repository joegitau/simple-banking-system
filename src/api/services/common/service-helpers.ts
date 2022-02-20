import argon2 from 'argon2';
import { randomBytes } from 'crypto';

import { Client } from '../../../api/entities/Client.entity';
import { Banker } from '../../../api/entities/Banker.entity';

export interface TokenOptions {
  expiry: string | number;
  secret: string;
}

export class ServiceHelpers {
  static async hashPassword(user: Client | Banker): Promise<string> {
    const salt = randomBytes(32);

    return await argon2.hash(user.password, { salt });
  }
}
