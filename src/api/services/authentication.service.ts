import argon2 from 'argon2';

import config from '../../config';
import JWTHelpers from '../../api/jwt';
import { UserEntity } from '../../types';
import { ErrorHandler } from '../../utils/helpers/error-handler';
import { ErrorMessage } from '../../utils/helpers/error-messages';
import { SuccessMessage } from '../../utils/helpers/success-messages';

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

      this.user.token = refreshToken;
      await this.user.save();

      Reflect.deleteProperty(this.user, 'password');

      return { accessToken, refreshToken };
    };
  }

  logout(refreshToken: string) {
    return async (
      finderUserFn: (refreshToken: string) => Promise<UserEntity>
    ) => {
      this.user = await finderUserFn(refreshToken);

      // set user's token in DB to an empty string
      this.user.token = '';
      await this.user.save();

      return {
        message: SuccessMessage.USER_LOGGED_OUT,
        lastname: this.user.lastname,
      };
    };
  }
}

export default new AuthenticationService();
