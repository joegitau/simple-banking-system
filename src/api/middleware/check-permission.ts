import { Request, Response, NextFunction } from 'express';

import Logger from '../../utils/logger';
import clientService from '../services/client.service';
import { Role } from '../entities/common/Person.entity';
import bankerService from '../../api/services/banker.service';
import { ErrorHandler } from '../../utils/helpers/error-handler';
import { ErrorMessage } from '../../utils/helpers/error-messages';

const checkPermission =
  (...roles: Role[]) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const { uuid, role } = req.currentUser;

      if (!role) {
        throw new ErrorHandler(401, ErrorMessage.CURRENT_USER_ROLE_NOT_FOUND);
      }

      let user;
      if (role === 'client') {
        user = await clientService.getClientByUuid(uuid);
      } else if (role === 'banker') {
        user = await bankerService.getBankerByUuid(uuid);
      }

      if (!user) {
        throw new ErrorHandler(401, ErrorMessage.CURRENT_USER_NOT_FOUND);
      }

      if (!roles.includes(user.role)) {
        throw new ErrorHandler(403, ErrorMessage.FORBIDDEN);
      }

      return next();
    } catch (e: any) {
      Logger.error("Could not verify user's role.");
      next(e);
    }
  };

export default checkPermission;
