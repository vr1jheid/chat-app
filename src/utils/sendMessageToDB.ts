import {
  serverTimestamp,
  updateDoc,
  addDoc,
  collection,
  doc,
} from "firebase/firestore";
import { MessageAuthor } from "../Components/Chat/Chat";
import { db } from "../firebase-config";

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

  const messageWithInfo = {
    id: messageDocRef.id,
    messageText,
    author: {
      email: author.email,
      displayName: author.displayName,
      avatarURL: author.avatarURL,
    },
    serverTime: serverTimestamp(),
  };

  await updateDoc(messageDocRef, { ...messageWithInfo });
  await updateDoc(chatDocRef, {
    "chatInfo.lastMessage": messageWithInfo,
  });
};

export default sendMessageToDB;
