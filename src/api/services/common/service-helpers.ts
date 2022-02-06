import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

import { InputDTO } from '../../../types';
import config from '../../../config';
import { ObjectLiteral } from 'typeorm';

export class ServiceHelpers {
  static async hashPassword(input: ObjectLiteral): Promise<string> {
    const salt = randomBytes(32);

    return await argon2.hash(input.password, { salt });
  }

  static generateToken(input: InputDTO): string {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 7);

    const payload = {
      uuid: input.uuid,
      lastname: input.lastname,
      role: input.role,
      exp: exp.getTime() / 1000,
    };

    return jwt.sign(payload, config.JWT_SECRET);
  }
}
