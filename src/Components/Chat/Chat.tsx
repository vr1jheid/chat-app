import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  deleteField,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Message from "../Message";
import MessageInput from "./MessageInput";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/slices/currentUser";
import ChatHeader from "./ChatHeader";
import { Button, Divider } from "@mui/material";
import isNewDate from "../../utils/isNewDate";
import getDate from "../../utils/getDate";
import Loader from "../Loader";

export interface MessageAuthor {
  email: string | null;
  displayName: string | null;
  avatarURL: string | null;
}

export interface Timestamp {
  nanoseconds: number;
  seconds: number;
}

interface MessageData {
  id: string;
  messageText: string;
  author: MessageAuthor;
  serverTime: Timestamp;
  tracked: boolean;
}

interface Props {
  chatDocRef: DocumentReference<DocumentData, DocumentData>;
}

const Chat = ({ chatDocRef }: Props) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const scrollable = useRef<HTMLDivElement>(null);

  const sendMessage = async (messageText: string) => {
    if (!messageText) return;

    const messageId = uuidv4();
    const messageWithInfo = {
      [messageId]: {
        id: messageId,
        messageText,
        author: {
          email: currentUser.email,
          displayName: currentUser.displayName,
          avatarURL: currentUser.avatarURL,
        },
        serverTime: serverTimestamp(),
      },
    };

    const docSnap = await getDoc(chatDocRef);

    /* Создаем документ, если отсутствует */
    if (!docSnap.exists()) {
      await setDoc(chatDocRef, { messages: { ...messageWithInfo } });
      return;
    }

    /* Добавляем новые сообщения */
    await updateDoc(chatDocRef, {
      [`messages.${messageId}`]: Object.values(messageWithInfo)[0],
    });
  };

  const test = async () => {};

  const deleteMessage = async (
    chatRef: DocumentReference<DocumentData, DocumentData>,
    messageId: string
  ) => {
    await updateDoc(chatRef, {
      [`messages.${messageId}`]: deleteField(),
    });
  };

  const subOnChanges = () => {
    const displayData = (doc: DocumentSnapshot<DocumentData, DocumentData>) => {
      if (doc.metadata.hasPendingWrites) {
        console.log("local data");
      }

      const resp = doc.data();
      /* Документ отсутсвует или нет поля с сообщениями */
      if (!doc.exists() || !resp?.messages) {
        console.log("here");
        setMessages([]);
        setIsLoading(false);
        return;
      }

      const messages = Object.values(resp.messages) as MessageData[];
      console.log("Current data: ", resp);
      setMessages(messages);
      setIsLoading(false);
    };

    const unsub = onSnapshot(chatDocRef, displayData);
    return unsub;
  };

  useEffect(() => {
    const unsub = subOnChanges();
    return () => {
      setIsLoading(true);
      unsub();
    };
  }, [chatDocRef]);

  const scrollToBottom = () => {
    const node = scrollable.current;
    node?.scrollTo(0, node.scrollHeight);
  };

  const sortedMessages = messages.sort((a, b) => {
    if (!a.serverTime) return -1;
    return b.serverTime.seconds - a.serverTime.seconds;
  });

  return (
    <div className="pb-5 w-full grow mx-auto bg-slate-100 flex items-center flex-col overflow-y-auto">
      <ChatHeader />
      <div
        ref={scrollable}
        className="p-4  grow w-full flex flex-col-reverse gap-4 overflow-y-auto relative"
      >
        {isLoading ? (
          <Loader color="black" />
        ) : (
          sortedMessages.map((m, i, arr) => {
            let newDate =
              Boolean(arr[i + 1]) &&
              Boolean(m.serverTime) &&
              isNewDate(m.serverTime.seconds, arr[i + 1].serverTime.seconds);

            return (
              <div key={m.id}>
                {newDate && (
                  <Divider sx={{ marginBottom: "1rem", fontSize: "1.5rem" }}>
                    {getDate(m.serverTime.seconds)}
                  </Divider>
                )}
                <Message
                  author={m.author}
                  text={m.messageText}
                  timestamp={m.serverTime}
                  deleteMessage={() => deleteMessage(chatDocRef, m.id)}
                />
              </div>
            );
          })
        )}
      </div>
      <MessageInput scroll={scrollToBottom} sendMessage={sendMessage} />
      <Button onClick={test}>Test</Button>
    </div>
  );
};

export default Chat;
