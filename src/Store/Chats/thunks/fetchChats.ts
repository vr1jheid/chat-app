import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, where, getDocs, query, or } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { convertServerTime } from "../../../utils/convertServerTime";
import { ChatData, ChatDataDB } from "../../../Types/chatTypes";
import { ChatsState } from "../chats";

export const fetchChats = createAsyncThunk(
  "chats/fetchChats",
  async (userEmail: string) => {
    const q = query(
      collection(db, "chats"),
      or(
        where("id", "==", "mainChat"),
        where("members", "array-contains", userEmail)
      )
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
      };

      if (lastMessage) {
        chatData.lastMessage = {
          ...lastMessage,
          serverTime: convertServerTime(lastMessage.serverTime),
        };
      }
      chatsFromDB[snapshotDoc.id] = chatData;
    });

    return chatsFromDB;
  }
);
