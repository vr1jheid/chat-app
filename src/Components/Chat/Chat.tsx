import { deleteDoc, doc } from "firebase/firestore";
import SendMessageForm from "./MessageInput";
import ChatHeader from "./ChatHeader";
import { db } from "../../firebase-config";

import { useSubChat } from "../../Hooks/useSubChat";

import MessagesList from "./MessagesList/MessagesList";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { selectActiveChatID } from "../../Store/ActiveChat/activeChat";
import { useEffect } from "react";
import { clearSizes } from "../../Store/MessagesSizes/messagesSizes";

const Chat = () => {
  console.log("chat rerender");
  const activeChatID = useAppSelector(selectActiveChatID);
  const dispatch = useAppDispatch();

  const deleteMessage = async (chatID: string, messageID: string) => {
    await deleteDoc(doc(db, `chats/${chatID}/messages/${messageID}`));
  };
  useSubChat([]);

  useEffect(() => {
    dispatch(clearSizes());
  }, [activeChatID]);

  return (
    <div className="pb-5 max-h-full h-full relative grow mx-auto bg-transparent flex items-center flex-col overflow-y-auto">
      <ChatHeader />
      <MessagesList />
      <SendMessageForm />
    </div>
  );
};

export default Chat;
