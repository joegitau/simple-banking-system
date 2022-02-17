import jwt from 'jsonwebtoken';

import { UserEntity } from '../../types';
export interface TokenOptions {
  expiry?: string | number;
  secret: string;
}

class JWTHelpers {
  generateToken(user: UserEntity, opts: TokenOptions): string {
    const payload = {
      uuid: user.uuid,
      role: user.role,
    };

    return jwt.sign(payload, opts.secret, {
      expiresIn: opts.expiry,
      algorithm: 'HS256',
    });
  }

  verifyToken(
    token: string,
    opts: TokenOptions,
    callbackFn?: (err: any, decoded: any) => void
  ) {
    jwt.verify(token, opts.secret, { algorithms: ['HS256'] }, callbackFn);
  }
}

export default new JWTHelpers();
