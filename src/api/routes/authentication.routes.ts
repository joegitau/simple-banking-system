import { Router } from 'express';

import { validateRequest } from '../../api/middleware';
import userDTOResource from '../../api/validators/user-dto.validator';
import authenticationController from '../../api/controllers/authentication.controller';

const route = Router();

route.post(
  '/login',
  validateRequest(userDTOResource),
  authenticationController.login
);

export default route;
