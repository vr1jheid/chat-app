import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, where, getDocs, query } from "firebase/firestore";
import { ChatData, ChatDataDB, ChatTypes } from "../../../Types/chatTypes";
import { ChatsState } from "../chats";
import { db } from "../../../main";
import { subOnLastMessageChange } from "../../../Services/subOnLastMessageChange";
import { enqueueSnackbar } from "notistack";
import { RootState } from "../../store";
import getUserFromDB from "../../../Services/getUserFromDB";
import { UserDataDB } from "../../../Types/userTypes";

import { dbMessageToLocal } from "../../../utils/dbMessageToLocal";
import { getChatDataFromLS } from "../../../utils/getChatDataFromLS";
import { getUnseenMessagesCount } from "../../../utils/getUnseenMessagesCount";

export const fetchChats = createAsyncThunk(
  "chats/fetchChats",
  async (chatsIDs: string[], { rejectWithValue, getState }) => {
    const { chats, currentUser } = getState() as RootState;
    const q = query(
      collection(db, "chats"),
      where("id", "in", ["mainChat", ...chatsIDs])
    );

    const chatsFromDB: ChatsState = {};
    try {
      const querySnapshot = await getDocs(q);
      for (const snapshotDoc of querySnapshot.docs) {
        const docData = snapshotDoc.data() as ChatDataDB;
        const { members, lastMessage, type, id } = docData;
        /* Фетчим только новые чаты */
        if (chats[id]) continue;

        const unseenMessages = await getUnseenMessagesCount(id);
        console.log(unseenMessages);

        const chatData: ChatData = {
          id: id,
          members,
          type,
          hasNextPage: getChatDataFromLS(id)?.hasNextPage ?? true,
          cachedMessages: getChatDataFromLS(id)?.cachedMessages ?? [],
          unseenMessages,
        };

        if (lastMessage) {
          chatData.lastMessage = dbMessageToLocal(lastMessage);
        }

        if (chatData.type === ChatTypes.dialog) {
          const dialogPartnerEmail = chatData.members.find(
            (m) => m !== currentUser.email
          );

          if (dialogPartnerEmail) {
            const dialogPartner = (await getUserFromDB(
              dialogPartnerEmail
            )) as UserDataDB;
            chatData.dialogPartner = {
              email: dialogPartner.email,
              avatarURL: dialogPartner.avatarURL,
              displayName: dialogPartner.displayName,
            };
          }
        }

        chatsFromDB[snapshotDoc.id] = chatData;
      }
    } catch (error) {
      enqueueSnackbar("Error loading chats", { variant: "error" });
      return rejectWithValue(error);
    }

    subOnLastMessageChange(Object.keys(chatsFromDB));

    return chatsFromDB;
  }
);
