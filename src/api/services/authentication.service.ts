import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import config from '../../config';
import { JWTHelpers } from '../../api/jwt';
import { Client } from '../../api/entities/Client.entity';
import { Banker } from '../../api/entities/Banker.entity';
import { ErrorHandler } from '../../utils/helpers/error-handler';
import { ErrorMessage } from '../../utils/helpers/error-messages';

export type UserEntity = Banker | Client;

class AuthenticationService {
  private user: UserEntity;

  login(email: string, password: string) {
    return async (findUserFn: (email: string) => Promise<UserEntity>) => {
      this.user = await findUserFn(email);

      const validPassword = argon2.verify(this.user?.password, password);
      if (!validPassword) {
        throw new ErrorHandler(401, ErrorMessage.INVALID_EMAIL_PASSWORD);
      }

      const accessToken = JWTHelpers.generateToken(this.user, {
        secret: config.ACCESS_TOKEN_SECRET,
        expiry: '300s',
      });

      const refreshToken = JWTHelpers.generateToken(this.user, {
        secret: config.REFRESH_TOKEN_SECRET,
        expiry: '1y',
      });

      this.user.tokens = this.user.tokens.concat(refreshToken);
      await this.user.save();

      Reflect.deleteProperty(this.user, 'password');

      return { accessToken, refreshToken };
    };
  }

  async setRefreshToken(refreshToken: string) {
    jwt.verify(
      refreshToken,
      config.REFRESH_TOKEN_SECRET,
      (err: any, decoded: any) => {
        if (err || this.user.uuid !== decoded) {
          throw new ErrorHandler(403, ErrorMessage.INVALID_REFRESH_TOKEN);
        }

        // create a new accessToken
        const newAccessToken = JWTHelpers.generateToken(this.user, {
          secret: config.ACCESS_TOKEN_SECRET,
          expiry: '300s',
        });

        return newAccessToken;
      }
    );
  }
}

export default new AuthenticationService();
