import {
  serverTimestamp,
  updateDoc,
  addDoc,
  collection,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { MessageAuthor, MessageDataDB } from "../Types/messageTypes";

type SendMessageToDB = (
  messageText: string,
  chatID: string,
  author: MessageAuthor
) => Promise<void>;

const sendMessageToDB: SendMessageToDB = async (
  messageText,
  chatID,
  author
) => {
  if (!messageText) return;

  const messageDocRef = await addDoc(
    collection(db, `chats/${chatID}/messages`),
    {}
  );
  const chatDocRef = doc(db, `chats/${chatID}`);
  const serverTime = serverTimestamp() as Timestamp;

  const messageWithInfo: MessageDataDB = {
    id: messageDocRef.id,
    messageText,
    author: {
      email: author.email,
      displayName: author.displayName,
      avatarURL: author.avatarURL,
    },
    serverTime,
  };

  await updateDoc(messageDocRef, { ...messageWithInfo });
  await updateDoc(chatDocRef, {
    lastMessage: messageWithInfo,
  });
};

export default sendMessageToDB;
