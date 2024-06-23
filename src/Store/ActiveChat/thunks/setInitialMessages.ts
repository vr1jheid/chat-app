import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChatData } from "../../../Types/chatTypes";
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
import { MessageData, MessageDataDB } from "../../../Types/messageTypes";
import { convertServerTime } from "../../../utils/convertServerTime";
import { enqueueSnackbar } from "notistack";

const getQuery = async (chatData: ChatData) => {
  console.log(chatData);

  const ref = collection(db, `chats/${chatData.id}/messages`);
  if (!chatData.cachedMessages.length) {
    return query(ref, orderBy("serverTime", "desc"), limit(30));
  }

  const lastCachedMessageRef = doc(
    db,
    `chats/${chatData.id}/messages/${chatData.cachedMessages[0].id}`
  );
  const lastCachedMessageSnap = await getDoc(lastCachedMessageRef);
  const lastCachedMessageDataDB = lastCachedMessageSnap.data() as MessageDataDB;

  return query(
    ref,
    where("serverTime", ">", lastCachedMessageDataDB.serverTime),
    orderBy("serverTime", "desc")
  );
};

export const setInitialMessages = createAsyncThunk(
  "activeChat/setInitialMessages",
  async (chatData: ChatData, { rejectWithValue }) => {
    const messages: MessageData[] = [];

    try {
      const query = await getQuery(chatData);
      const querySnapshot = await getDocs(query);
      querySnapshot.forEach((doc) => {
        const message = doc.data() as MessageDataDB;
        const validMessage: MessageData = {
          ...message,
          serverTime: convertServerTime(message.serverTime),
        };
        messages.push(validMessage);
      });
    } catch (error) {
      enqueueSnackbar("Error loading messages", { variant: "error" });
      return rejectWithValue(error);
    }
    return [...messages, ...chatData.cachedMessages];
  }
);
