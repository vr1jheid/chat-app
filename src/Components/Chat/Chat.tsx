import { useEffect, useRef, useState } from "react";

import {
  DocumentData,
  DocumentReference,
  collection,
  deleteField,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/slices/currentUser";
import ChatHeader from "./ChatHeader";
import { Button, Divider } from "@mui/material";
import isNewDate from "../../utils/isNewDate";
import getDateFromTimestamp from "../../utils/getDateFromTimestamp";
import Loader from "../Loader";
import sendMessageToDB from "../../Services/sendMessageToDB";
import { db } from "../../firebase-config";
import {
  addMessage,
  selectActiveChat,
  setMessages,
} from "../../redux/slices/chats";
import { convertServerTimestamp } from "../../utils/convertServerTimestamp";

export interface MessageAuthor {
  email: string | null;
  displayName: string | null;
  avatarURL: string | null;
}

export interface Timestamp {
  nanoseconds: number;
  seconds: number;
}

export interface MessageData {
  id: string;
  messageText: string;
  author: MessageAuthor;
  serverTime: Timestamp;
}

const Chat = () => {
  const dispatch = useAppDispatch();
  const { id: activeChatID } = useAppSelector(selectActiveChat);
  const { messages } = useAppSelector(selectActiveChat);
  const [chatDocRef, setChatDocRef] = useState<DocumentReference>(
    doc(db, `chats/${activeChatID}`)
  );
  /*   const [messages, setMessages] = useState<MessageData[]>([]); */
  /*   const [isLoading, setIsLoading] = useState(true); */

  const currentUser = useAppSelector(selectCurrentUser);

  const scrollable = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeChatID) return;
    const newChatDocRef = doc(db, `chats/${activeChatID}`);
    setChatDocRef(newChatDocRef);
  }, [activeChatID]);

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
    const q = query(collection(db, `chats/${activeChatID}/messages`));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log(messages);

      if (querySnapshot.metadata.hasPendingWrites) return;

      const messagesFromDB: MessageData[] = [];
      console.log("messages created");

      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          /*           console.log("new message", change.type, change.doc.data()); */
          const message = change.doc.data() as MessageData;
          messagesFromDB.push({
            ...message,
            serverTime: convertServerTimestamp(message.serverTime),
          });
        }
        if (change.type === "modified") {
          console.log("new message", change.type, change.doc.data());

          const message = change.doc.data() as MessageData;

          dispatch(
            addMessage({
              ...message,
              serverTime: convertServerTimestamp(message.serverTime),
            })
          );
        }
      });

      if (messagesFromDB.length) {
        dispatch(
          setMessages(
            messagesFromDB.sort((a, b) => {
              if (!a.serverTime) return -1;
              return b.serverTime.seconds - a.serverTime.seconds;
            })
          )
        );
        /*         setMessages([...messages, ...messagesFromDB]); */
      }
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsub = subOnChanges();
    return unsub;
  }, [activeChatID]);

  const scrollToBottom = () => {
    const node = scrollable.current;
    node?.scrollTo(0, node.scrollHeight);
  };

  const sortedMessages = messages; /* .sort((a, b) => {
    if (!a.serverTime) return -1;
    return b.serverTime.seconds - a.serverTime.seconds;
  }) */

  return (
    <div className="pb-5 w-full grow mx-auto bg-slate-100 flex items-center flex-col overflow-y-auto">
      <ChatHeader />
      <div
        ref={scrollable}
        className="p-4  grow w-full flex flex-col-reverse gap-4 overflow-y-auto relative"
      >
        {false ? (
          <Loader color="black" />
        ) : (
          sortedMessages.map((m, i, arr) => {
            let newDate =
              Boolean(arr[i + 1]) &&
              Boolean(m.serverTime) &&
              isNewDate(m.serverTime.seconds, arr[i + 1].serverTime.seconds);
            if (i === arr.length - 1) {
              newDate = true;
            }
            return (
              <div key={m.id}>
                {newDate && (
                  <Divider sx={{ marginBottom: "1rem", fontSize: "1.5rem" }}>
                    {m.serverTime && getDateFromTimestamp(m.serverTime.seconds)}
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
