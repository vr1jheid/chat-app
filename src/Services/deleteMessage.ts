import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../main";

export const deleteMessage = async (chatID: string, messageID: string) => {
  await deleteDoc(doc(db, `chats/${chatID}/messages/${messageID}`));
};
