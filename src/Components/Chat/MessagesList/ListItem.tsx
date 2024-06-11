import { useRef } from "react";
import { deleteMessage } from "../../../Services/deleteMessage";
import { selectActiveChat } from "../../../Store/ActiveChat/activeChat";
import { selectCurrentUser } from "../../../Store/CurrentUser/currentUser";
import { useAppSelector } from "../../../Store/hooks";
import { ChatTypes } from "../../../Types/chatTypes";
import Message from "./Message";
import Loader from "../../Shared/Loader";

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
  console.log(index, isItemLoaded(index));

  return (
    <div ref={container} style={style}>
      {isItemLoaded(index) ? (
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
      ) : (
        <div>
          <Loader color="white" />
        </div>
      )}
    </div>
  );
};

export default ListItem;
