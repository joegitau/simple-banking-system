import jwt from 'jsonwebtoken';

import { Person } from '../../api/entities/common/Person.entity';

export interface TokenOptions {
  expiry?: string | number;
  secret: string;
}

export class JWTHelpers {
  static generateToken(user: Person, opts: TokenOptions): string {
    const payload = {
      uuid: user.uuid,
      role: user.role,
    };

    return jwt.sign(payload, opts.secret, {
      expiresIn: opts.expiry,
      algorithm: 'HS256',
    });
  }

  static verifyToken(token: string, opts: TokenOptions) {
    return jwt.verify(token, opts.secret, { algorithms: ['HS256'] });
  }
}
