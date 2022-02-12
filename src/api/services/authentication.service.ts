import argon2 from 'argon2';

import config from '../../config';
import { JWTHelpers } from '../../api/jwt';
import { Person } from '../../api/entities/common/Person.entity';
import { ErrorHandler } from '../../utils/helpers/error-handler';
import { ErrorMessage } from '../../utils/helpers/error-messages';

class AuthenticationService {
  async login(email: string, password: string) {
    const user: Person = await Person.findOneOrFail({ email });

    const validPassword = argon2.verify(password, user.password);
    if (!validPassword) {
      throw new ErrorHandler(401, ErrorMessage.INVALID_EMAIL_PASSWORD);
    }

    const accessToken = JWTHelpers.generateToken(user, {
      secret: config.ACCESS_TOKEN_SECRET,
      expiry: '300s',
    });

    const refreshToken = JWTHelpers.generateToken(user, {
      secret: config.REFRESH_TOKEN_SECRET,
      expiry: '1y',
    });

    user.tokens = user.tokens.concat(refreshToken);
    await user.save();

    Reflect.deleteProperty(user, 'password');

    return { accessToken, refreshToken };
  }
}

export default new AuthenticationService();
