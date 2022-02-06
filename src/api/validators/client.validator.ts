import { boolean, number, object, string } from 'zod';

import { ErrorMessage } from '../../utils/helpers/error-messages';

export const clientCreator = object({
  body: object({
    firstname: string({ required_error: ErrorMessage.FIRSTNAME_IS_REQUIRED }),
    lastname: string({ required_error: ErrorMessage.LASTNAME_IS_REQUIRED }),
    email: string({ required_error: ErrorMessage.EMAIL_IS_REQUIRED }).email(
      ErrorMessage.EMAIL_IN_USE
    ),
    active: boolean().optional(),
    cardNumber: number({ required_error: ErrorMessage.CARD_NO_REQUIRED })
      .min(10, ErrorMessage.CARD_NO_MIN(10))
      .max(10, ErrorMessage.CARD_NO_MAX(10)),
    balance: number().optional(),
    transactions: object({
      amount: number({
        invalid_type_error: ErrorMessage.AMOUNT_NUMERIC,
      }).optional(),
      type: string().optional(),
    }).optional(),
  }),
});
