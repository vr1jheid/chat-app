import { query, collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { MessageData } from "../Types/messageTypes";
import { db } from "../firebase-config";

import { convertServerTime } from "../utils/convertServerTime";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import {
  addMessage,
  selectActiveChat,
  selectActiveChatLoading,
  setMessages,
} from "../Store/ActiveChat/activeChat";

export const useSubChat = (dependencies: any[]) => {
  const dispatch = useAppDispatch();
  const { id: activeChatID } = useAppSelector(selectActiveChat);
  const isLoading = useAppSelector(selectActiveChatLoading);

  const subOnChanges = () => {
    const q = query(collection(db, `chats/${activeChatID}/messages`));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const initMessages: MessageData[] = [];

      querySnapshot.docChanges().forEach((change) => {
        const message = change.doc.data() as MessageData;
        if (!message.id) return;

        const validMessage = {
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

  useEffect(() => {
    const unsub = subOnChanges();
    return unsub;
  }, [...dependencies, isLoading]);
};
