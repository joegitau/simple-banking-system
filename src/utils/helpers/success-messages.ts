// prettier-ignore
export const SuccessMessage = {
  BANKER_CLIENT_CONNECTED: (bankerUuid: string, clientUuid: string) =>
    `Banker with uuid: ${bankerUuid} successfully connected to Client with uuid: ${clientUuid}.`,
  CLIENT_DELETED: (uuid: string) => `Client with uuid: ${uuid} successfully deleted.`,
  USER_LOGGED_OUT: 'User successfully logged out.',
  NO_CONTENT: 'No content.', // 402
}
