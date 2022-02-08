import { Request, Response, NextFunction } from 'express';

import Logger from '../../utils/logger';
import clientService from '../../api/services/client.service';
import { Role } from '../../api/entities/common/Person.entity';
import { ErrorHandler } from '../../utils/helpers/error-handler';
import { ErrorMessage } from '../../utils/helpers/error-messages';

const checkRole =
  (role: Role) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { uuid } = req.currentUser;

      // FIXME: this could be a client or banker - probably needs further abstraction!
      const user = await clientService.getClientByUuid(uuid);
      if (!user) {
        throw new ErrorHandler(401, ErrorMessage.CURRENT_USER_NOT_FOUND);
      }

      if (!user.hasAccessTo(role)) {
        throw new ErrorHandler(403, ErrorMessage.FORBIDDEN);
      }

      return next();
    } catch (e: any) {
      Logger.error("Could not verify user's role.");
      next(e);
    }
  };

export default checkRole;
