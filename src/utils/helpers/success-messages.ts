// prettier-ignore
export const SuccessMessages = {
  BANKER_CLIENT_CONNECTED: (bankerUuid: string, clientUuid: string) =>
    `Banker with uuid: ${bankerUuid} successfully connected to Client with uuid: ${clientUuid}.`,
  CLIENT_DELETED: (uuid: string) => `Client with uuid: ${uuid} successfully deleted.`
}
