import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { ObjectLiteral } from 'typeorm';

import { InputDTO } from '../../../types';
import config from '../../../config';
import { Client } from '../../../api/entities/Client.entity';
import { Banker } from '../../../api/entities/Banker.entity';

export class ServiceHelpers {
  static async hashPassword(input: ObjectLiteral): Promise<string> {
    const salt = randomBytes(32);

    return await argon2.hash(input.password, { salt });
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
