import { store } from "../../../Store/store";
import { isSameDate } from "../../../utils/isSameDate";
import {
  DATE_BLOCK_SIZE,
  MESSAGE_MARGIN_BOT,
} from "../constants/sizeConstants";
import { MessagesSizes } from "../Context/ChatContext";

export const getChatItemSize = (
  index: number,
  messagesSizes: MessagesSizes
) => {
  const { activeChat } = store.getState();
  const message = activeChat.messages[index];
  const prevMessage = activeChat.messages[index + 1];
  console.log(message.id, messagesSizes[message.id]);

  const messageSize = messagesSizes[message.id];

  if (!messageSize) {
    return 50;
  }

  if (
    (prevMessage?.serverTime &&
      message.serverTime &&
      !isSameDate(message.serverTime, prevMessage.serverTime)) ||
    index === activeChat.messages.length - 1
  ) {
    return messageSize + MESSAGE_MARGIN_BOT + DATE_BLOCK_SIZE;
  }

  return messageSize + MESSAGE_MARGIN_BOT;
};
