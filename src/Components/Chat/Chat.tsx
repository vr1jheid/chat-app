import { useRef } from "react";

import { deleteDoc, doc } from "firebase/firestore";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/slices/currentUser";
import ChatHeader from "./ChatHeader";
import { Button, Divider } from "@mui/material";
import biggerDate from "../../utils/biggerDate";
import getDateFromTimestamp from "../../utils/getDateFromTimestamp";
import sendMessageToDB from "../../Services/sendMessageToDB";
import { db } from "../../firebase-config";
import { selectActiveChat } from "../../redux/slices/chats";
import { useSubChat } from "../../Hooks/useSubChat";

const Chat = () => {
  const { id: activeChatID } = useAppSelector(selectActiveChat);
  const { messages } = useAppSelector(selectActiveChat);

  const currentUser = useAppSelector(selectCurrentUser);
  const scrollable = useRef<HTMLDivElement>(null);

  useSubChat(activeChatID);

  const test = async () => {};

  const deleteMessage = async (chatID: string, messageID: string) => {
    await deleteDoc(doc(db, `chats/${chatID}/messages/${messageID}`));
  };

  const scrollToBottom = () => {
    const node = scrollable.current;
    node?.scrollTo(0, node.scrollHeight);
  };

  return (
    <div className="pb-5 w-full grow mx-auto bg-slate-100 flex items-center flex-col overflow-y-auto">
      <ChatHeader />
      <div
        ref={scrollable}
        className="p-4  grow w-full flex flex-col-reverse gap-4 overflow-y-auto relative"
      >
        {
          /* Рендер начинается с самого свежего сообщения */
          messages.map((m, i, arr) => {
            const newDate =
              arr[i + 1] &&
              arr[i].serverTime &&
              arr[i + 1].serverTime &&
              biggerDate(
                arr[i].serverTime!.seconds,
                arr[i + 1].serverTime!.seconds
              );
            return (
              <div key={m.id}>
                {newDate && (
                  <Divider sx={{ marginBottom: "1rem", fontSize: "1.5rem" }}>
                    {getDateFromTimestamp(newDate)}
                  </Divider>
                )}
                <Message
                  author={m.author}
                  text={m.messageText}
                  timestamp={m.serverTime}
                  deleteMessage={() => deleteMessage(activeChatID, m.id)}
                />
              </div>
            );
          })
        }
      </div>
      <MessageInput
        scroll={scrollToBottom}
        sendMessage={(messageText) => {
          sendMessageToDB(messageText, activeChatID, currentUser);
        }}
      />
      <Button onClick={test}>Test</Button>
    </div>
  );
};

export default Chat;
