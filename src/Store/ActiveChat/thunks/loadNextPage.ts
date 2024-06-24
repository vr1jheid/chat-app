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
import { enqueueSnackbar } from "notistack";
import { ITEMS_PER_PAGE } from "../activeChat";

export const loadNextPage = createAsyncThunk(
  "activeChat/loadNextPage",
  async (_, { getState, rejectWithValue }) => {
    const { activeChat } = getState() as RootState;
    const { messages, id: activeChatID } = activeChat;
    const nextPageMessages: MessageData[] = [];
    const oldestMessage = messages[messages.length - 1];
    const oldestMessageRef = doc(
      db,
      `chats/${activeChatID}/messages/${oldestMessage.id}`
    );

    try {
      const oldestMessageSnap = await getDoc(oldestMessageRef);
      const { serverTime } = oldestMessageSnap.data() as MessageDataDB;

      const nextPageQuery = query(
        collection(db, `chats/${activeChatID}/messages`),
        where("serverTime", "<", serverTime),
        orderBy("serverTime", "desc"),
        limit(ITEMS_PER_PAGE)
      );

      const querySnapshot = await getDocs(nextPageQuery);

      querySnapshot.forEach((doc) => {
        const message = doc.data() as MessageDataDB;
        const validMessage = {
          ...message,
          serverTime: convertServerTime(message.serverTime),
        };
        nextPageMessages.push(validMessage);
      });
    } catch (error) {
      enqueueSnackbar("Error loading more messages", { variant: "error" });
      return rejectWithValue(error);
    }

    return nextPageMessages;
  }
);
