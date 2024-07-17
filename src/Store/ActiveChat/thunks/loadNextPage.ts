import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { enqueueSnackbar } from "notistack";

import { db } from "../../../main";
import { MessageData, MessageDataDB } from "../../../Types/messageTypes";
import { dbMessageToLocal } from "../../../utils/dbMessageToLocal";
import { RootState } from "../../store";
import { ITEMS_PER_PAGE } from "../activeChat";

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
