import { query, collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { MessageData, MessageDataDB } from "../Types/messageTypes";
import { db } from "../firebase-config";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import {
  addMessage,
  selectActiveChatID,
  selectActiveChatLoading,
  setMessages,
} from "../Store/ActiveChat/activeChat";
import { convertServerTime } from "../utils/convertServerTime";

export const useSubChat = (dependencies: any[]) => {
  const dispatch = useAppDispatch();
  const activeChatID = useAppSelector(selectActiveChatID);
  const isLoading = useAppSelector(selectActiveChatLoading);

  const subOnChanges = () => {
    if (!activeChatID) return;

    const q = query(collection(db, `chats/${activeChatID}/messages`));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const initMessages: MessageData[] = [];

      querySnapshot.docChanges().forEach((change) => {
        const message = change.doc.data() as MessageDataDB;
        if (!message.id) return;
        const validMessage: MessageData = {
          ...message,
          serverTime: convertServerTime(message.serverTime),
        };

        if (change.type === "added") {
          initMessages.push(validMessage);
        }
        if (change.type === "modified") {
          dispatch(addMessage(validMessage));
          return;
        }
      });

      if (isLoading) {
        dispatch(setMessages(initMessages));
      }
    });

    return unsubscribe;
  };

  useEffect(() => {}, []);

  useEffect(() => {
    const unsub = subOnChanges();
    return unsub;
  }, [...dependencies, activeChatID, isLoading]);
};
