import { deleteDoc, doc } from "firebase/firestore";
import MessageInput from "./MessageInput";
import { useAppSelector } from "../../Store/hooks";
import { selectCurrentUser } from "../../Store/CurrentUser/currentUser";
import ChatHeader from "./ChatHeader";
import sendMessageToDB from "../../Services/sendMessageToDB";
import { db } from "../../firebase-config";
import { useSubChat } from "../../Hooks/useSubChat";
import Loader from "../Shared/Loader";
import {
  selectActiveChat,
  selectActiveChatLoading,
  selectActiveChatMessagesCount,
} from "../../Store/ActiveChat/activeChat";
import MessagesList from "./MessagesList/MessagesList";
import MessagesListContext, { ChatContext } from "./ChatContextContainer";
import { useContext, useEffect } from "react";

const Chat = () => {
  /*   console.log("chat rerender"); */

  const { id: activeChatID } = useAppSelector(selectActiveChat);
  const isLoading = useAppSelector(selectActiveChatLoading);
  const currentUser = useAppSelector(selectCurrentUser);
  const messagesCount = useAppSelector(selectActiveChatMessagesCount);
  const { listRef } = useContext(ChatContext);
  const deleteMessage = async (chatID: string, messageID: string) => {
    await deleteDoc(doc(db, `chats/${chatID}/messages/${messageID}`));
  };

  useEffect(() => {
    listRef?.current?.scrollToItem(messagesCount);
  }, [messagesCount]);

  return (
    <div className="pb-5 max-h-full h-full relative grow mx-auto bg-transparent flex items-center flex-col overflow-y-auto">
      <ChatHeader />
      {isLoading && <Loader color="white" />}
      <MessagesList />
      <MessageInput
        scroll={() => {}}
        sendMessage={(messageText) => {
          sendMessageToDB(messageText, activeChatID, currentUser);
          setTimeout(() => {
            listRef?.current?.scrollToItem(messagesCount);
          }, 200);
        }}
      />
    </div>
  );
};

export default Chat;
