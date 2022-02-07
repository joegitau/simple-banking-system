import { boolean, number, object, string } from 'zod';

import { ErrorMessage } from '../../utils/helpers/error-messages';

const clientResource = object({
  body: object({
    firstname: string({
      required_error: ErrorMessage.FIRSTNAME_IS_REQUIRED,
    }).optional(),
    lastname: string({
      required_error: ErrorMessage.LASTNAME_IS_REQUIRED,
    }).optional(),
    email: string({ required_error: ErrorMessage.EMAIL_IS_REQUIRED }).email(
      ErrorMessage.EMAIL_IN_USE
    ),
    password: string().min(3, ErrorMessage.PASSWORD_MIN(3)),
    active: boolean().optional(),
    cardNumber: number({ required_error: ErrorMessage.CARD_NO_REQUIRED }).min(
      10,
      ErrorMessage.CARD_NO_MIN(10)
    ),
    balance: number().optional(),
    transactions: object({
      amount: number({
        invalid_type_error: ErrorMessage.AMOUNT_NUMERIC,
      }).optional(),
      type: string().optional(),
    }).optional(),
  }),
});

export default clientResource;
