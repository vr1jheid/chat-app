import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";

import { db } from "../main";
import { store } from "../Store/store";

export const getUnseenMessagesCount = async (chatID: string) => {
  const { currentUser } = store.getState();
  const ref = collection(db, `chats/${chatID}/messages`);
  const lastSeenMessage = currentUser.chats[chatID].lastSeenMessage;
  const messagesQuery = !lastSeenMessage
    ? query(ref)
    : query(
        ref,
        where(
          "serverTime",
          ">",
          Timestamp.fromMillis(lastSeenMessage.timestampMillis)
        )
      );

  const querySnapshot = await getDocs(messagesQuery);
  return querySnapshot.size;
};
