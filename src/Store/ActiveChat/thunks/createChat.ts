import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ChatDataDB, ChatTypes } from "../../../Types/chatTypes";
import { db } from "../../../main";

export const createChat = createAsyncThunk(
  "chats/createChat",
  async (members: string[]) => {
    console.log("here");

    const newChatDoc = await addDoc(collection(db, "chats"), {});

    const chatInitialData: ChatDataDB = {
      id: newChatDoc.id,
      members,
      type: members.length > 2 ? ChatTypes.group : ChatTypes.dialog,
    };

    await updateDoc(newChatDoc, { ...chatInitialData });

    members.forEach(async (member) => {
      const userDocRef = doc(db, `users/${member}`);

      await updateDoc(userDocRef, {
        "userData.chats": arrayUnion(newChatDoc.id),
      });
    });

    return chatInitialData;
  }
);
