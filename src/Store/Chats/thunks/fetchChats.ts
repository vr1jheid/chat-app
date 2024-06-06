import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, where, getDocs, query, or } from "firebase/firestore";
import { convertServerTime } from "../../../utils/convertServerTime";
import { ChatData, ChatDataDB } from "../../../Types/chatTypes";
import { ChatsState } from "../chats";
import { db } from "../../../main";
import { subOnLastMessageChange } from "../../../Components/Chat selection/utils/subOnLastMessageChange";
import { Unsubscribe } from "firebase/auth";

const fetchChatsWrapper = () => {
  let unsubOnLastMessage: Unsubscribe | null | undefined = null;

  return createAsyncThunk("chats/fetchChats", async (chatsIDs: string[]) => {
    const q = query(
      collection(db, "chats"),
      or(where("id", "in", ["mainChat", ...chatsIDs]))
    );

    const querySnaphot = await getDocs(q);
    const chatsFromDB: ChatsState = {};

    querySnaphot.forEach((snapshotDoc) => {
      const docData = snapshotDoc.data() as ChatDataDB;

      const { members, lastMessage, type } = docData;

      const chatData: ChatData = {
        id: snapshotDoc.id,
        members,
        type,
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

    unsubOnLastMessage && unsubOnLastMessage();
    unsubOnLastMessage = subOnLastMessageChange(Object.keys(chatsFromDB));

    return chatsFromDB;
  });
};

export const fetchChats = fetchChatsWrapper();
