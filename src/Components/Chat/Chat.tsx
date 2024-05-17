import { useEffect, useRef, useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useAppSelector } from "../../Store/hooks";
import { selectCurrentUser } from "../../Store/CurrentUser/currentUser";
import ChatHeader from "./ChatHeader";
import { Divider } from "@mui/material";
import biggerDate from "../../utils/biggerDate";
import getDateFromTimestamp from "../../utils/getDateFromTimestamp";
import sendMessageToDB from "../../Services/sendMessageToDB";
import { db } from "../../firebase-config";
import { useSubChat } from "../../Hooks/useSubChat";
import Loader from "../Shared/Loader";
import { ChatTypes } from "../../Types/chatTypes";
import {
  selectActiveChat,
  selectActiveChatLoading,
} from "../../Store/ActiveChat/activeChat";
import { VariableSizeList } from "react-window";
import { MessageData } from "../../Types/messageTypes";
import MessageContainer from "./MessageContainer";

const Chat = () => {
  const { id: activeChatID, type: activeChatType } =
    useAppSelector(selectActiveChat);
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);
  const { messages } = useAppSelector(selectActiveChat);
  const isLoading = useAppSelector(selectActiveChatLoading);
  const currentUser = useAppSelector(selectCurrentUser);

  const [chatBodySize, setChatBodySize] = useState<any>(null);
  const chatBodyContainer = useRef<HTMLDivElement | null>(null);

  useSubChat([activeChatID]);

  const deleteMessage = async (chatID: string, messageID: string) => {
    await deleteDoc(doc(db, `chats/${chatID}/messages/${messageID}`));
  };

  const renderMessages = (messages: MessageData[]) => {
    /* arr[0] - последнее сообщение */
    const nodes = messages.map((m, i, arr) => {
      const newDate =
        arr[i + 1] &&
        arr[i].serverTime &&
        arr[i + 1].serverTime &&
        biggerDate(arr[i].serverTime!.seconds, arr[i + 1].serverTime!.seconds);
      const isMyself = currentUserEmail === m.author.email;

      return (
        <div key={m.id}>
          {newDate && (
            <Divider
              sx={{
                marginBottom: "1rem",
                fontSize: "1.5rem",
                color: "white",
              }}
            >
              {getDateFromTimestamp(newDate)}
            </Divider>
          )}
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
    });
    return nodes;
  };

  useEffect(() => {
    if (chatBodyContainer.current) {
      console.log("here");

      setChatBodySize({
        width: chatBodyContainer.current.clientWidth,
        height: chatBodyContainer.current.clientHeight,
      });
    }
  }, [activeChatID]);

  return (
    <div className="pb-5 max-h-full h-full relative grow mx-auto bg-transparent flex items-center flex-col overflow-y-auto">
      <ChatHeader />
      {isLoading && <Loader color="white" />}

      <div
        ref={chatBodyContainer}
        className="w-full h-full flex justify-center items-center"
      >
        {chatBodyContainer.current && (
          <VariableSizeList
            height={chatBodySize.height}
            width={chatBodySize.width}
            itemCount={messages.length}
            itemSize={(index) => {
              const message = messages[index];

              const additionalSize = 16 + 10 + 20;
              return (
                Math.ceil(message.messageText.length / 57) * 28 + additionalSize
              );
            }}
          >
            {MessageContainer}
          </VariableSizeList>
        )}
      </div>

      <MessageInput
        scroll={() => {}}
        sendMessage={(messageText) => {
          sendMessageToDB(messageText, activeChatID, currentUser);
        }}
      />
    </div>
  );
};

export default Chat;
