import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

import config from '../../../config';
import { Client } from '../../../api/entities/Client.entity';
import { Banker } from '../../../api/entities/Banker.entity';

export class ServiceHelpers {
  static async hashPassword(user: Client | Banker): Promise<string> {
    const salt = randomBytes(32);

    return await argon2.hash(user.password, { salt });
  }

  static generateToken(user: Client | Banker): string {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 7);

    const payload = {
      uuid: user.uuid,
      lastname: user.lastname,
      role: user.role,
      exp: exp.getTime() / 1000,
    };

    return jwt.sign(payload, config.ACCESS_TOKEN_SECRET);
  }
}
