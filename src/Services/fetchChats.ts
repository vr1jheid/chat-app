import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, where, getDocs, query, or } from "firebase/firestore";
import { db } from "../firebase-config";
import { AllUserChats } from "../redux/slices/chats";
import { convertServerTime } from "../utils/convertServerTime";
import { ChatDataDB } from "../Types/chatTypes";

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
    const chatsFromDB: AllUserChats = {};

    querySnaphot.forEach((snapshotDoc) => {
      const docData = snapshotDoc.data();
      const { members, lastMessage, type } = docData;

      const chatData: ChatDataDB = {
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
