import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { ChatData, ChatTypes } from "../Components/Types/chatTypes";

export const createChat = createAsyncThunk(
  "chats/createChat",
  async (members: string[]) => {
    console.log("here");

    const newChatDoc = await addDoc(collection(db, "chats"), {});

    const chatInitialData: ChatData = {
      id: newChatDoc.id,
      members,
      type: members.length > 2 ? ChatTypes.group : ChatTypes.dialog,
    };

    await updateDoc(newChatDoc, { ...chatInitialData });

    return chatInitialData;
  }
);
