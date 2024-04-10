import { useEffect, useState } from "react";
import {
  DocumentData,
  DocumentSnapshot,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase-config";
import Message from "./Message";
import MessageInput from "./MessageInput";

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

const Chat = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const firebaseRef = doc(db, "mainChat", "messages");

  const subOnChanges = () => {
    const displayData = (doc: DocumentSnapshot<DocumentData, DocumentData>) => {
      if (doc.metadata.hasPendingWrites) {
        /*
          Данные пока добавлены только локально. Можно как-то их пометить
         */
        return;
      }
      const resp = Object.values(doc.data()!);
      console.log("Current data: ", resp);
      setMessages(resp);
    };

    const ref = doc(db, "mainChat", "messages");
    const unsub = onSnapshot(ref, displayData);
    return unsub;
  };

  useEffect(() => {
    const unsub = subOnChanges();
    return unsub;
  }, []);

  const sortedMessages = messages.sort(
    (a, b) => b.serverTime.seconds - a.serverTime.seconds
  );

  return (
    <div className="h-[700px] w-9/12 bg-slate-100 mx-auto my-10 rounded flex items-center flex-col ">
      <div className=" p-4 grow w-full flex flex-col-reverse gap-4 overflow-y-auto">
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
      <MessageInput firebaseRef={firebaseRef} />
    </div>
  );
};

export default Chat;
