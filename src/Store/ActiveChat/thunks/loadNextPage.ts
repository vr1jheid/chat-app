import { createAsyncThunk } from "@reduxjs/toolkit";
import { MessageData, MessageDataDB } from "../../../Types/messageTypes";
import { RootState } from "../../store";
import {
  Timestamp,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../main";
import { enqueueSnackbar } from "notistack";
import { ITEMS_PER_PAGE } from "../activeChat";
import { dbMessageToLocal } from "../../../utils/dbMessageToLocal";

export const loadNextPage = createAsyncThunk(
  "activeChat/loadNextPage",
  async (_, { getState, rejectWithValue }) => {
    const { activeChat } = getState() as RootState;
    const { messages, id: activeChatID } = activeChat;
    const nextPageMessages: MessageData[] = [];

    try {
      const nextPageQuery = query(
        collection(db, `chats/${activeChatID}/messages`),
        where(
          "serverTime",
          "<",
          Timestamp.fromMillis(messages[messages.length - 1].serverTime!)
        ),
        orderBy("serverTime", "desc"),
        limit(ITEMS_PER_PAGE)
      );

      const querySnapshot = await getDocs(nextPageQuery);
      querySnapshot.forEach((doc) => {
        const message = doc.data() as MessageDataDB;
        nextPageMessages.push(dbMessageToLocal(message));
      });
    } catch (error) {
      enqueueSnackbar("Error loading more messages", { variant: "error" });
      return rejectWithValue(error);
    }

    return nextPageMessages;
  }
);
