import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";

export const createChat = createAsyncThunk(
  "chats/createChat",
  async (members: string[]) => {
    const newChatDoc = await addDoc(collection(db, "chats"), {
      chatInfo: {
        members,
      },
    });
    const toState = {
      [newChatDoc.id]: {
        members,
      },
    };
    return { ...toState };
  }
);
