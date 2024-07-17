import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { enqueueSnackbar } from "notistack";

import { db } from "../main";
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

  const messageWithInfo: MessageDataDB = {
    id: messageDocRef.id,
    messageText,
    author: {
      email: author.email,
      displayName: author.displayName,
      avatarURL: author.avatarURL,
    },
    serverTime: serverTimestamp() as Timestamp,
  };
  try {
    await updateDoc(messageDocRef, { ...messageWithInfo });
    await updateDoc(chatDocRef, {
      lastMessage: messageWithInfo,
    });
  } catch (error) {
    if (error instanceof Error) {
      enqueueSnackbar("Error sending message", { variant: "error" });
    }
  }
};

export default sendMessageToDB;
