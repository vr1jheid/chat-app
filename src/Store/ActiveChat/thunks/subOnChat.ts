import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  query,
  collection,
  onSnapshot,
  Unsubscribe,
  updateDoc,
  doc,
} from "firebase/firestore";
import { MessageDataDB } from "../../../Types/messageTypes";
import { db } from "../../../main";
import { addMessage } from "../activeChat";
import { RootState } from "../../store";
import { dbMessageToLocal } from "../../../utils/dbMessageToLocal";

interface SubProps {
  action: "sub";
  chatID?: string;
}
interface UnsubProps {
  action: "unsub";
}

const subOnChatWrapper = () => {
  let unsubscribe: null | Unsubscribe = null;

  return createAsyncThunk(
    "activeChat/subOnChat",
    async (props: SubProps | UnsubProps, { dispatch, getState }) => {
      if (props.action === "unsub") {
        unsubscribe && unsubscribe();
        return;
      }
      const { currentUser } = getState() as RootState;

      const q = query(collection(db, `chats/${props.chatID}/messages`));

      unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const changes = querySnapshot.docChanges();
        for (let change of changes) {
          const message = change.doc.data() as MessageDataDB;
          if (change.type !== "modified" || !message.id) return;
          dispatch(addMessage(dbMessageToLocal(message)));

          if (querySnapshot.metadata.hasPendingWrites) return;
          try {
            await updateDoc(doc(db, `users/${currentUser.email}`), {
              [`userData.chats.${props.chatID}.lastSeenMessage.id`]: message.id,
              [`userData.chats.${props.chatID}.lastSeenMessage.timestampMillis`]:
                message.serverTime.toMillis(),
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  );
};

export const subOnChat = subOnChatWrapper();
