// prettier-ignore
export const ErrorMessage = {
  NO_CLIENT_EXIST: (clientUuid: string) => `Client with UUID: ${clientUuid} does not exist.`,
  NO_CLIENTS_EXIST: 'No clients found.',
  CLIENT_EXISTS: 'Client already exists.',
  NO_CLIENT_OR_BANKER_EXISTS: 'Either Client or Banker don\'t exist - or both don\'t exist.',
  EMAIL_IN_USE: () => 'This email has already been registered.',
};
