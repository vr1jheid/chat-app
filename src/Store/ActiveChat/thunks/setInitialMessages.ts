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
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../main";
import { MessageData, MessageDataDB } from "../../../Types/messageTypes";
import { convertServerTime } from "../../../utils/convertServerTime";
import { enqueueSnackbar } from "notistack";
import { RootState } from "../../store";

const getQuery = async (chatData: ChatData) => {
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
  async (chatData: ChatData, { getState, rejectWithValue }) => {
    const { currentUser, activeChat } = getState() as RootState;
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

    if (messages.length) {
      try {
        await updateDoc(doc(db, `users/${currentUser.email}`), {
          [`userData.chats.${activeChat.id}.lastSeenMessage`]: messages[0].id,
        });
      } catch (error) {
        console.log(error);
      }
    }

    return [...messages, ...chatData.cachedMessages];
  }
);
