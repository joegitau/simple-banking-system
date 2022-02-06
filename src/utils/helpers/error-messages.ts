// prettier-ignore
export const ErrorMessage = {
  NO_CLIENT_EXIST: (clientUuid: string) => `Client with UUID: ${clientUuid} does not exist.`,
  NO_CLIENTS_EXIST: 'No clients found.',
  CLIENT_EXISTS: 'Client already exists.',
  NO_CLIENT_OR_BANKER_EXISTS: 'Either Client or Banker don\'t exist - or both don\'t exist.',
  EMAIL_IN_USE: 'This email has already been registered.',
  FIRSTNAME_IS_REQUIRED: 'First name is required.',
  LASTNAME_IS_REQUIRED: 'Last name is required.',
  EMAIL_IS_REQUIRED: 'Email is required.',
  CARD_NO_REQUIRED: 'Card number is required.',
  CARD_NO_MIN: (min: number) => `Card number cannot be less than ${min} digits.`,
  CARD_NO_MAX: (max: number) => `Card number cannot be greater than ${max} digits.`,
  EMPLOYEE_NO_REQUIRED: 'Employee number is required.',
  EMPLOYEE_NO_MIN: (min: number) => `Employee number cannot be less than ${min} digits.`,
  EMPLOYEE_NO_MAX: (max: number) => `Employee number cannot be greater than ${max} digits.`,
  AMOUNT_NUMERIC: 'Amount should be numeric',
  AMOUNT_IS_REQUIRED: 'Transaction amount is required.'
};
