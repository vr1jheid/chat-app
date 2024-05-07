import { useRef } from "react";
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

const Row = ({ index, style }: { index: string; style: any }) => (
  <div style={style}>Row {index}</div>
);

const Chat = () => {
  const { id: activeChatID, type: activeChatType } =
    useAppSelector(selectActiveChat);
  const { email: currentUserEmail } = useAppSelector(selectCurrentUser);

  const { messages } = useAppSelector(selectActiveChat);
  const isLoading = useAppSelector(selectActiveChatLoading);

  const currentUser = useAppSelector(selectCurrentUser);
  const scrollable = useRef<HTMLDivElement>(null);

  useSubChat([activeChatID]);

  const deleteMessage = async (chatID: string, messageID: string) => {
    await deleteDoc(doc(db, `chats/${chatID}/messages/${messageID}`));
  };

  const scrollToBottom = () => {
    const node = scrollable.current;
    node?.scrollTo(0, node.scrollHeight);
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

  const messagesReverse = [...messages].reverse();

  return (
    <div className="pb-5 max-h-full h-full grow mx-auto bg-transparent flex items-center flex-col overflow-y-auto">
      <ChatHeader />
      {/*       <div
        ref={scrollable}
        className=" px-5 grow w-full flex flex-col-reverse gap-4 overflow-y-auto relative"
      >
        {isLoading ? <Loader color="white" /> : renderMessages(messages)}
      </div> */}
      <VariableSizeList
        height={1000}
        itemCount={messages.length}
        itemSize={(index) => {
          const message = messagesReverse[index];
          console.log(message);

          const additionalSize = 50;
          return (
            Math.ceil(message.messageText.length / 40) * 30 + additionalSize
          );
        }}
        width={1000}
      >
        {MessageContainer}
      </VariableSizeList>
      <MessageInput
        scroll={scrollToBottom}
        sendMessage={(messageText) => {
          sendMessageToDB(messageText, activeChatID, currentUser);
        }}
      />
    </div>
  );
};

export default Chat;
