import { deleteDoc, doc } from "firebase/firestore";
import { selectActiveChat } from "../../Store/ActiveChat/activeChat";
import { selectCurrentUser } from "../../Store/CurrentUser/currentUser";
import { useAppSelector } from "../../Store/hooks";
import { ChatTypes } from "../../Types/chatTypes";
import { db } from "../../firebase-config";
import Message from "./Message";

const MessageContainer = ({ index, style }: any) => {
  const {
    type: activeChatType,
    messages,
    id: activeChatID,
  } = useAppSelector(selectActiveChat);
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);

  const messagesCopy = [...messages];
  messagesCopy.reverse();

  const m = messagesCopy[index];

  const isMyself = currentUserEmail === m.author.email;

  const deleteMessage = async (chatID: string, messageID: string) => {
    await deleteDoc(doc(db, `chats/${chatID}/messages/${messageID}`));
  };

  return (
    <div style={style}>
      <Message
        isMyself={isMyself}
        author={
          !isMyself && activeChatType === ChatTypes.group ? m.author : null
        }
        text={m.messageText}
        timestamp={m.serverTime}
        deleteMessage={() => deleteMessage(activeChatID, m.id)}
      />
    </div>
  );
};

export default MessageContainer;
