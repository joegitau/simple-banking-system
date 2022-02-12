import { object, string } from 'zod';

const userDTOResource = object({
  body: object({
    email: string({ required_error: 'Email is required.' }).email(
      'Not a valid email address.'
    ),
    password: string({ required_error: 'Password is required.' }),
  }),
});

export default userDTOResource;
