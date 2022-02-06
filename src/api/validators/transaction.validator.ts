import { number, object, string } from 'zod';

import { ErrorMessage } from '../../utils/helpers/error-messages';

export const transactionValidator = object({
  body: object({
    amount: number({ required_error: ErrorMessage.AMOUNT_IS_REQUIRED }),
    type: string(),
  }),
});
