import { useRef } from "react";
import { deleteMessage } from "../../../Services/deleteMessage";
import { selectActiveChat } from "../../../Store/ActiveChat/activeChat";
import { selectCurrentUser } from "../../../Store/CurrentUser/currentUser";
import { useAppSelector } from "../../../Store/hooks";
import { ChatTypes } from "../../../Types/chatTypes";
import Message from "./Message";
import Loader from "../../Shared/Loader";
import getDateFromTimestamp from "../../../utils/getDateFromTimestamp";
import { isNextDay } from "../../../utils/isNextDay";

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

  const renderDate = () => {
    if (
      isNextDay(message, messages[index + 1]) ||
      index === messages.length - 1
    ) {
      return (
        <div className="text-white absolute left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 p-2 rounded-full bg-gray-light">
          {getDateFromTimestamp(message.serverTime?.seconds!)}
        </div>
      );
    }
  };

  return (
    <div className="rotate-180 relative" ref={container} style={style}>
      {isItemLoaded(index) ? (
        <>
          {renderDate()}
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
