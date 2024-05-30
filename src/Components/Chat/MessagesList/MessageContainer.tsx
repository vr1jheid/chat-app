import { useRef } from "react";
import { deleteMessage } from "../../../Services/deleteMessage";
import { selectActiveChat } from "../../../Store/ActiveChat/activeChat";
import { selectCurrentUser } from "../../../Store/CurrentUser/currentUser";
import { useAppSelector } from "../../../Store/hooks";
import { ChatTypes } from "../../../Types/chatTypes";
import Message from "./Message";

const MessageContainer = ({ index, style }: any) => {
  const {
    type: activeChatType,
    messages,
    id: activeChatID,
  } = useAppSelector(selectActiveChat);
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);
  const message = messages[index];
  const isMyself = currentUserEmail === message.author.email;

  const container = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={container} style={style} key={message.id}>
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
    </div>
  );
};

export default MessageContainer;
