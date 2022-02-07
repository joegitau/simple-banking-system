import { number, object, string } from 'zod';

import { ErrorMessage } from '../../utils/helpers/error-messages';

const transactionResource = object({
  body: object({
    amount: number({ required_error: ErrorMessage.AMOUNT_IS_REQUIRED }),
    type: string(),
  }),
});

export default transactionResource;
