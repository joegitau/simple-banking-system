import jwt from 'jsonwebtoken';

import config from '../../config';
import Logger from '../../utils/logger';
import { Banker } from '../../api/entities/Banker.entity';
import { Client } from '../../api/entities/Client.entity';
import { ErrorHandler } from '../../utils/helpers/error-handler';
import { ErrorMessage } from '../../utils/helpers/error-messages';
import { Person } from '../../api/entities/common/Person.entity';

export interface TokenOptions {
  expiry?: string | number;
  secret: string;
}

export class JWTHelpers {
  static generateToken(user: Client | Banker, opts: TokenOptions): string {
    const payload = {
      uuid: user.uuid,
      role: user.role,
    };

    return jwt.sign(payload, opts.secret, {
      expiresIn: opts.expiry,
      algorithm: 'HS256',
    });
  }

  // static async setRefreshToken(refreshToken: string) {
  //   // we know that the refreshToken contains user's uuid and role - as such, we find user by their uuid
  //   const user = await Person.findOneOrFail({ uuid: refreshToken });

  //   jwt.verify(
  //     refreshToken,
  //     config.REFRESH_TOKEN_SECRET,
  //     (err: any, decoded: any) => {
  //       Logger.debug('::: Decoded %o', decoded);

  //       if (err || user.uuid !== decoded) {
  //         throw new ErrorHandler(403, ErrorMessage.INVALID_REFRESH_TOKEN);
  //       }

  //       // the user should match the previous user
  //       const newAccessToken = this.generateToken(user, {
  //         secret: config.ACCESS_TOKEN_SECRET,
  //         expiry: '300s',
  //       });
  //       return newAccessToken;
  //     }
  //   );
  // }
}
