import {
  DocumentReference,
  DocumentData,
  serverTimestamp,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { MessageAuthor } from "../Components/Chat/Chat";

type MessageSender = (
  messageText: string,
  chatDocRef: DocumentReference<DocumentData, DocumentData>,
  author: MessageAuthor
) => Promise<void>;

const sendMessageToDB: MessageSender = async (
  messageText,
  chatDocRef,
  author
) => {
  if (!messageText) return;

  const messageId = uuidv4();
  const messageWithInfo = {
    [messageId]: {
      id: messageId,
      messageText,
      author: {
        email: author.email,
        displayName: author.displayName,
        avatarURL: author.avatarURL,
      },
      serverTime: serverTimestamp(),
    },
  };
  const messageObjToSend = Object.values(messageWithInfo)[0];
  const docSnap = await getDoc(chatDocRef);

  /* Создаем документ, если отсутствует */
  if (!docSnap.exists()) {
    await setDoc(chatDocRef, { messages: { ...messageWithInfo } });
    return;
  }

  /* Добавляем новые сообщения */
  await updateDoc(chatDocRef, {
    [`chatInfo.lastMessage`]: messageObjToSend,
    [`messages.${messageId}`]: messageObjToSend,
  });
};

export default sendMessageToDB;
