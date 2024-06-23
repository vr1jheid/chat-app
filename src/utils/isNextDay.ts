import { MessageData } from "../Types/messageTypes";

export const isNextDay = (
  message: MessageData,
  nextMessage: MessageData | undefined
) => {
  if (!message.serverTime || !nextMessage?.serverTime) {
    return false;
  }
  const messageDate = new Date(message.serverTime?.seconds * 1000);
  const nextMessageDate = new Date(nextMessage.serverTime.seconds * 1000);

  return nextMessageDate.getDate() - messageDate.getDate() !== 0;
};
