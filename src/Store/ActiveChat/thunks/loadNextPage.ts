import { createAsyncThunk } from "@reduxjs/toolkit";
import { MessageData, MessageDataDB } from "../../../Types/messageTypes";
import { RootState } from "../../store";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../main";
import { convertServerTime } from "../../../utils/convertServerTime";

export const loadNextPage = createAsyncThunk(
  "activeChat/loadNextPage",
  async (_, thunkAPI) => {
    const { activeChat } = thunkAPI.getState() as RootState;
    const { messages, id: activeChatID } = activeChat;
    const oldestMessage = messages[messages.length - 1];
    const oldestMessageRef = doc(
      db,
      `chats/${activeChatID}/messages/${oldestMessage.id}`
    );
    const oldestMessageSnap = await getDoc(oldestMessageRef);
    const { serverTime } = oldestMessageSnap.data() as MessageDataDB;

    const nextPageQuery = query(
      collection(db, `chats/${activeChatID}/messages`),
      where("serverTime", "<", serverTime),
      orderBy("serverTime", "desc"),
      limit(20)
    );

    const querySnapshot = await getDocs(nextPageQuery);
    const nextPageMessages: MessageData[] = [];
    querySnapshot.forEach((doc) => {
      const message = doc.data() as MessageDataDB;
      const validMessage = {
        ...message,
        serverTime: convertServerTime(message.serverTime),
      };
      nextPageMessages.push(validMessage);
    });
    console.log(nextPageMessages);
    return nextPageMessages;
  }
);
