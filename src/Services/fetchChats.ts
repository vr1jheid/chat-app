import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, where, getDocs, doc, query } from "firebase/firestore";
import { db } from "../firebase-config";
import { ChatData, ChatsState } from "../redux/slices/chats";
import { convertServerTimestamp } from "../utils/convertServerTimestamp";

export const fetchChats = createAsyncThunk(
  "chats/fetchChats",
  async (userEmail: string) => {
    console.log("fetchChats");

    const q = query(
      collection(db, "chats"),
      where("chatInfo.members", "array-contains", userEmail)
    );

    const querySnaphot = await getDocs(q);
    const chatsFromDB: ChatsState = {};

    querySnaphot.forEach((snapshotDoc) => {
      const docData = snapshotDoc.data();
      const { members, lastMessage } = docData.chatInfo;
      const chatData: ChatData = {
        members,
      };

      if (lastMessage) {
        chatData.lastMessage = {
          ...lastMessage,
          serverTime: convertServerTimestamp(lastMessage.serverTime),
        };
      }
      chatsFromDB[snapshotDoc.id] = chatData;
    });
    return chatsFromDB;
  }
);
