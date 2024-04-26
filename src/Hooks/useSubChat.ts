import { query, collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { MessageData } from "../Types/messageTypes";
import { db } from "../firebase-config";
import {
  addMessage,
  selectActiveChat,
  setMessages,
} from "../redux/slices/chats";
import { convertServerTimestamp } from "../utils/convertServerTimestamp";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export const useSubChat = (dependencies: any) => {
  const dispatch = useAppDispatch();
  const { id: activeChatID } = useAppSelector(selectActiveChat);

  const subOnChanges = () => {
    const q = query(collection(db, `chats/${activeChatID}/messages`));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const initMessages: MessageData[] = [];

      querySnapshot.docChanges().forEach((change) => {
        const message = change.doc.data() as MessageData;
        if (!message.id) return;

        const validMessage = {
          ...message,
          serverTime: convertServerTimestamp(message.serverTime),
        };

        if (change.type === "added") {
          initMessages.push(validMessage);
        }
        if (change.type === "modified") {
          dispatch(addMessage(validMessage));
        }
      });

      if (initMessages.length) {
        dispatch(setMessages(initMessages));
      }
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsub = subOnChanges();
    return unsub;
  }, [dependencies]);
};
