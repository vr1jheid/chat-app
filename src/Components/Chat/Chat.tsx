import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DocumentData,
  DocumentSnapshot,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import Message from "../Message";
import MessageInput from "./MessageInput";
import { useAppSelector } from "../../redux/hooks";
import {
  selectUserEmail,
  selectUserName,
  selectAvatarURL,
  selectUser,
} from "../../redux/slices/currentUser";
import ChatHeader from "./ChatHeader";
import { selectDialogPartner } from "../../redux/slices/dialogPartner";
import { Button } from "@mui/material";

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
  message: string;
  author: MessageAuthor;
  serverTime: Timestamp;
  tracked: boolean;
}

interface Props {
  documentRef: string;
}

const Chat = ({ documentRef }: Props) => {
  const currentUser = useAppSelector(selectUser);

  const dialogPartner = useAppSelector(selectDialogPartner);

  const [messages, setMessages] = useState<MessageData[]>([]);
  const firebaseRef = doc(db, documentRef);
  const scrollable = useRef<HTMLDivElement>(null);

  const sendMessage = async (messageText: string) => {
    if (!messageText) return;

    const messageId = uuidv4();
    const messageWithInfo = {
      [messageId]: {
        id: messageId,
        message: messageText,
        author: {
          email: currentUser.email,
          displayName: currentUser.displayName,
          avatarURL: currentUser.avatarURL,
        },
        serverTime: serverTimestamp(),
      },
    };

    const docSnap = await getDoc(firebaseRef);

    /* Создаем документ, если отсутствует */
    if (!docSnap.exists()) {
      await setDoc(firebaseRef, { messages: { ...messageWithInfo } });
      return;
    }

    /* Добавляем новые сообщения */
    await updateDoc(firebaseRef, {
      [`messages.${messageId}`]: Object.values(messageWithInfo)[0],
    });
  };

  const test = async () => {
    /*     await updateDoc(doc(db, "Test/randomID"), {
      messages: { field1: "sigma", field2: "sojak" },
      hueta: ["email1", "email2"],
    }); */
    /* await updateDoc(doc(db, "Test/randomID"), {
      "messages.gjfkjgfk": "Obama",
    }); */
    console.log(messages[0].serverTime.seconds);
  };

  const subOnChanges = () => {
    const displayData = (doc: DocumentSnapshot<DocumentData, DocumentData>) => {
      if (doc.metadata.hasPendingWrites) {
        /*
          Данные пока добавлены только локально. Можно как-то их пометить
         */
        return;
      }

      if (!doc.exists()) {
        setMessages([]);
        return;
      }

      const resp = doc.data();
      /* На случай пустого документа */
      if (!resp.messages) {
        setMessages([]);
      }

      const messages = Object.values(resp.messages) as MessageData[];
      console.log("Current data: ", resp);
      setMessages(messages);
    };

    /* const ref = doc(db, "mainChat", "messages"); */
    const unsub = onSnapshot(firebaseRef, displayData);
    return unsub;
  };

  useEffect(() => {
    console.log("refresh sub");

    const unsub = subOnChanges();
    return unsub;
  }, [documentRef]);

  const scrollToBottom = () => {
    const node = scrollable.current;
    node?.scrollTo(0, node.scrollHeight);
  };

  const sortedMessages = messages.sort((a, b) => {
    console.log("Object a", a);
    console.log("Object b", b);

    return b.serverTime.seconds - a.serverTime.seconds;
  });

  return (
    <div className="pb-5 w-full grow mx-auto bg-slate-100 flex items-center flex-col overflow-y-auto">
      <ChatHeader
        chatName={
          dialogPartner.displayName || dialogPartner.email || "Main Chat"
        }
        chatIcon={dialogPartner.avatarURL}
      />
      <div
        ref={scrollable}
        className="p-4  grow w-full flex flex-col-reverse gap-4 overflow-y-auto"
      >
        {sortedMessages.length &&
          sortedMessages.map((m) => (
            <Message
              key={m.id}
              author={m.author}
              text={m.message}
              timestamp={m.serverTime}
            />
          ))}
      </div>
      <MessageInput
        scroll={scrollToBottom}
        sendMessage={sendMessage}
        firebaseRef={firebaseRef}
      />
      <Button onClick={test}>Test</Button>
    </div>
  );
};

export default Chat;
