import { MessageData } from "../Types/messageTypes";

export const isNextDay = (
  message: MessageData,
  nextMessage: MessageData | undefined
) => {
  if (!nextMessage?.serverTime) {
    return false;
  }
  const messageDate = new Date(message.serverTime || Date.now());
  const nextMessageDate = new Date(nextMessage.serverTime);

  return nextMessageDate.getDate() - messageDate.getDate() !== 0;
};
