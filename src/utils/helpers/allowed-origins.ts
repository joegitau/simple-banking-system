import { CorsOptions } from 'cors';

import { ErrorHandler } from './error-handler';
import { ErrorMessage } from './error-messages';

type StaticOrigin = boolean | string | RegExp | (boolean | string | RegExp)[];

export const allowedOrigins = [
  'http://127.0.0.1:5000',
  'http://localhost:5000',
  'https://joegitau.com',
];

export const corsOptions: CorsOptions = {
  origin: (
    requestOrigin: string | undefined,
    callback: (err: Error | null, origin?: StaticOrigin) => void
  ) => {
    if (allowedOrigins.includes(requestOrigin as string) || !requestOrigin) {
      callback(null, true);
    }

    callback(new ErrorHandler(403, ErrorMessage.NOT_ALLOWED_BY_CORS));
  },
};
