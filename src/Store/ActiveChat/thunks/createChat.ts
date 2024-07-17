import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

import { db } from "../../../main";
import getUserFromDB from "../../../Services/getUserFromDB";
import { ActiveChat, ChatDataDB, ChatTypes } from "../../../Types/chatTypes";
import { RootState } from "../../store";
import { cacheMessages } from "./cacheMessages";
import { subOnChat } from "./subOnChat";

export const createChat = createAsyncThunk(
  "createChat",
  async (chatPartners: string[], { dispatch, getState }) => {
    const { currentUser } = getState() as RootState;
    const newChatDoc = await addDoc(collection(db, "chats"), {});
    const members = [...chatPartners, currentUser.email];

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

    const localChatData: ActiveChat = {
      ...chatInitialData,
      messages: [],
      isLoading: false,
      isNextPageLoading: false,
      hasNextPage: false,
      dialogPartner:
        chatInitialData.type === ChatTypes.dialog
          ? await getUserFromDB(members[0])
          : null,
    };

    dispatch(cacheMessages());
    dispatch(subOnChat({ action: "sub", chatID: newChatDoc.id }));

    return localChatData;
  }
);
