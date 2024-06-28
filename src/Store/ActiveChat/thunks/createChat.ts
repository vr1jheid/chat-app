import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ChatDataDB, ChatTypes } from "../../../Types/chatTypes";
import { db } from "../../../main";
import { subOnChat } from "./subOnChat";
import { cacheMessages } from "./cacheMessages";

export const createChat = createAsyncThunk(
  "createChat",
  async (members: string[], { dispatch }) => {
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
        [`userData.chats.${newChatDoc.id}`]: {
          isMuted: false,
        },
      });
    });
    console.log("inCreateChat");

    dispatch(cacheMessages());
    dispatch(subOnChat({ action: "sub", chatID: newChatDoc.id }));

    return chatInitialData;
  }
);
