import { query, collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { MessageData, MessageDataDB } from "../Types/messageTypes";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import {
  addMessage,
  selectActiveChatID,
  /*   setMessages, */
} from "../Store/ActiveChat/activeChat";
import { convertServerTime } from "../utils/convertServerTime";
import { db } from "../main";

export const useSubChat = () => {
  const dispatch = useAppDispatch();
  const activeChatID = useAppSelector(selectActiveChatID);

  const subOnChanges = () => {
    if (!activeChatID) return;

    const q = query(collection(db, `chats/${activeChatID}/messages`));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        const message = change.doc.data() as MessageDataDB;
        if (!message.id) return;
        const validMessage: MessageData = {
          ...message,
          serverTime: convertServerTime(message.serverTime),
        };

        if (change.type === "modified") {
          dispatch(addMessage(validMessage));
          return;
        }
      });
    });

    return unsubscribe;
  };

  useEffect(() => {}, []);

  useEffect(() => {
    const unsub = subOnChanges();
    return unsub;
  }, [activeChatID]);
};
