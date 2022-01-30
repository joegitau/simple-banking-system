// prettier-ignore
export const ErrorMessage = {
  NO_CLIENT_EXIST: (clientUuid: string) => `Client with UUID: ${clientUuid} does not exist.`,
  NO_CLIENTS_EXIST: 'No clients found.',
  CLIENT_EXISTS: 'Client already exists.',
  EMAIL_IN_USE: () => 'This email has already been registered.',
};
