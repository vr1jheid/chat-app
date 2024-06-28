import { createAsyncThunk } from "@reduxjs/toolkit";
import { query, collection, onSnapshot, Unsubscribe } from "firebase/firestore";
import { MessageDataDB, MessageData } from "../../../Types/messageTypes";
import { db } from "../../../main";
import { convertServerTime } from "../../../utils/convertServerTime";
import { addMessage } from "../activeChat";

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
    (props: SubProps | UnsubProps, { dispatch }) => {
      if (props.action === "unsub") {
        unsubscribe && unsubscribe();
        return;
      }

      const q = query(collection(db, `chats/${props.chatID}/messages`));

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.docChanges().forEach(async (change) => {
          const message = change.doc.data() as MessageDataDB;
          if (!message.id) return;
          const validMessage: MessageData = {
            ...message,
            serverTime: convertServerTime(message.serverTime),
          };
          if (change.type !== "modified") return;

          dispatch(addMessage(validMessage));
          console.log(validMessage);

          /*    await updateDoc(doc(db, )); */
        });
      });
    }
  );
};

export const subOnChat = subOnChatWrapper();
