import { boolean, number, object, string } from 'zod';

import { ErrorMessage } from '../../utils/helpers/error-messages';

const bankerResource = object({
  body: object({
    firstname: string({ required_error: ErrorMessage.FIRSTNAME_IS_REQUIRED }),
    lastname: string({ required_error: ErrorMessage.LASTNAME_IS_REQUIRED }),
    email: string({ required_error: ErrorMessage.EMAIL_IS_REQUIRED }).email(
      ErrorMessage.EMAIL_IN_USE
    ),
    active: boolean().optional(),
    employeeNumber: number({
      required_error: ErrorMessage.EMPLOYEE_NO_REQUIRED,
    }).min(10, ErrorMessage.EMPLOYEE_NO_MIN(10)),
  }),
});

export default bankerResource;
