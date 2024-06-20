import { useRef } from "react";
import { deleteMessage } from "../../../Services/deleteMessage";
import { selectActiveChat } from "../../../Store/ActiveChat/activeChat";
import { selectCurrentUser } from "../../../Store/CurrentUser/currentUser";
import { useAppSelector } from "../../../Store/hooks";
import { ChatTypes } from "../../../Types/chatTypes";
import Message from "./Message";
import Loader from "../../Shared/Loader";
import { MessageData } from "../../../Types/messageTypes";
import getDateFromTimestamp from "../../../utils/getDateFromTimestamp";

const ListItem = ({ index, style }: any) => {
  const {
    type: activeChatType,
    messages,
    id: activeChatID,
  } = useAppSelector(selectActiveChat);
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);
  const message = messages[index];
  const isMyself = currentUserEmail === message?.author.email;

  const container = useRef<HTMLDivElement | null>(null);
  const isItemLoaded = (index: number) => index < messages.length;

  const isNextDay = (
    message: MessageData,
    nextMessage: MessageData | undefined
  ) => {
    if (!message.serverTime || !nextMessage?.serverTime) {
      return false;
    }
    console.log(
      message.serverTime?.nanoseconds,
      nextMessage.serverTime.nanoseconds
    );

    const messageDate = new Date(message.serverTime?.seconds * 1000);
    const nextMessageDate = new Date(nextMessage.serverTime.seconds * 1000);
    console.log(messageDate, nextMessageDate);

    return nextMessageDate.getDate() - messageDate.getDate() !== 0;
  };

  return (
    <div className="rotate-180 relative" ref={container} style={style}>
      {isItemLoaded(index) ? (
        <>
          {(isNextDay(message, messages[index + 1]) ||
            index === messages.length - 1) && (
            <div className="text-white absolute left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 p-2 rounded-full bg-gray-light">
              {getDateFromTimestamp(message.serverTime?.seconds!)}
            </div>
          )}
          <Message
            id={message.id}
            index={index}
            isMyself={isMyself}
            author={
              !isMyself && activeChatType === ChatTypes.group
                ? message.author
                : null
            }
            text={message.messageText}
            timestamp={message.serverTime}
            deleteMessage={() => deleteMessage(activeChatID, message.id)}
          />
        </>
      ) : (
        <div>
          <Loader color="white" />
        </div>
      )}
    </div>
  );
};

export default ListItem;
