import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, where, getDocs, query } from "firebase/firestore";
import { db } from "../firebase-config";
import { AllUserChats } from "../redux/slices/chats";
import { convertServerTimestamp } from "../utils/convertServerTimestamp";
import { ChatDataDB } from "../Components/Types/chatTypes";

export const fetchChats = createAsyncThunk(
  "chats/fetchChats",
  async (userEmail: string) => {
    console.log("fetchChats");

    const q = query(
      collection(db, "chats"),
      where("members", "array-contains", userEmail)
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
      console.log(docData);

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
