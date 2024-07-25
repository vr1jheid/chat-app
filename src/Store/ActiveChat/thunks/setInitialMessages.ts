import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { enqueueSnackbar } from "notistack";

import { db } from "../../../main";
import { ChatData } from "../../../Types/chatTypes";
import { MessageData, MessageDataDB } from "../../../Types/messageTypes";
import { dbMessageToLocal } from "../../../utils/dbMessageToLocal";
import { RootState } from "../../store";

const getQuery = async (chatData: ChatData) => {
  const ref = collection(db, `chats/${chatData.id}/messages`);
  if (!chatData.cachedMessages.length) {
    return query(ref, orderBy("serverTime", "desc"), limit(30));
  }

  return query(
    ref,
    where(
      "serverTime",
      ">",
      Timestamp.fromMillis(chatData.cachedMessages[0].serverTime!)
    ),
    orderBy("serverTime", "desc")
  );
};

export const setInitialMessages = createAsyncThunk(
  "activeChat/setInitialMessages",
  async (chatData: ChatData, { getState, rejectWithValue }) => {
    const { currentUser, activeChat } = getState() as RootState;
    const messages: MessageData[] = [];

    try {
      const query = await getQuery(chatData);
      const querySnapshot = await getDocs(query);
      querySnapshot.forEach((doc) => {
        const message = doc.data() as MessageDataDB;
        messages.push(dbMessageToLocal(message));
      });
    } catch (error) {
      enqueueSnackbar("Error loading messages", { variant: "error" });
      return rejectWithValue(error);
    }

    if (
      messages.length &&
      messages[0].id !== currentUser.chats[chatData.id].lastSeenMessage?.id
    ) {
      try {
        await updateDoc(doc(db, `users/${currentUser.email}`), {
          [`userData.chats.${activeChat.id}.lastSeenMessage.id`]:
            messages[0].id,
          [`userData.chats.${activeChat.id}.lastSeenMessage.timestampMillis`]:
            messages[0].serverTime,
        });
      } catch (error) {
        console.log(error);
      }
    }
    return [...messages, ...chatData.cachedMessages];
  }
);
