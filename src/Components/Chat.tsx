import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { child, push, ref, set, update } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "../redux/hooks";
import {
  selectAvatarURL,
  selectUser,
  selectUserEmail,
  selectUserName,
} from "../redux/slices/currentUser";
import {
  DocumentData,
  DocumentSnapshot,
  FieldValue,
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";
import Message from "./Message";

export interface MessageAuthor {
  email: string;
  name: string;
  avatarURL: string;
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
  const currentUser = useAppSelector(selectUser);
  const userEmail = useAppSelector(selectUserEmail);
  const userName = useAppSelector(selectUserName);
  const userAvatar = useAppSelector(selectAvatarURL);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageData[]>([]);

  const sendMessage = async () => {
    if (!message) return;

    const ref = doc(db, "mainChat", "messages");
    const messageId = uuidv4();
    const messageWithInfo = {
      [messageId]: {
        id: messageId,
        message,
        author: {
          email: userEmail,
          name: userName,
          avatarURL: userAvatar,
        },
        serverTime: serverTimestamp(),
      },
    };

    try {
      await updateDoc(ref, {
        ...messageWithInfo,
      });
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

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
      <form className=" w-full flex gap-2">
        <TextField
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            e.preventDefault();
            sendMessage();
          }}
          sx={{ background: "white" }}
          multiline
          fullWidth
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></TextField>
        <Button
          type="button"
          variant="contained"
          endIcon={<SendIcon />}
          onClick={sendMessage}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default Chat;
