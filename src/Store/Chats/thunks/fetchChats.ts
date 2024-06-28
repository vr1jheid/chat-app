import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, where, getDocs, query, or } from "firebase/firestore";
import { convertServerTime } from "../../../utils/convertServerTime";
import { ChatData, ChatDataDB } from "../../../Types/chatTypes";
import { ChatsState } from "../chats";
import { db } from "../../../main";
import { subOnLastMessageChange } from "../../../Services/subOnLastMessageChange";
import { Unsubscribe } from "firebase/auth";
import { enqueueSnackbar } from "notistack";
import { RootState } from "../../store";

const fetchChatsWrapper = () => {
  let unsubOnLastMessage: Unsubscribe | null | undefined = null;

  return createAsyncThunk(
    "chats/fetchChats",
    async (chatsIDs: string[], { rejectWithValue, getState }) => {
      const { chats } = getState() as RootState;
      const q = query(
        collection(db, "chats"),
        or(where("id", "in", ["mainChat", ...chatsIDs]))
      );

      const chatsFromDB: ChatsState = {};
      try {
        const querySnaphot = await getDocs(q);
        querySnaphot.forEach((snapshotDoc) => {
          const docData = snapshotDoc.data() as ChatDataDB;
          const { members, lastMessage, type, id } = docData;
          /* Фетчим только новые чаты */
          if (Object.keys(chats).includes(id)) return;

          const chatData: ChatData = {
            id: snapshotDoc.id,
            members,
            type,
            hasNextPage: true,
            cachedMessages: [],
          };

          if (lastMessage) {
            chatData.lastMessage = {
              ...lastMessage,
              serverTime: convertServerTime(lastMessage.serverTime),
            };
          }
          chatsFromDB[snapshotDoc.id] = chatData;
        });
      } catch (error) {
        enqueueSnackbar("Error loading chats", { variant: "error" });
        rejectWithValue(error);
      }

      unsubOnLastMessage && unsubOnLastMessage();
      unsubOnLastMessage = subOnLastMessageChange(Object.keys(chatsFromDB));

      return chatsFromDB;
    }
  );
};

export const fetchChats = fetchChatsWrapper();
