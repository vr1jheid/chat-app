import { MessageData, MessageDataDB } from "../Types/messageTypes";

export const dbMessageToLocal = (message: MessageDataDB): MessageData => {
  return {
    ...message,
    serverTime: message.serverTime ? message.serverTime.toMillis() : null,
  };
};
