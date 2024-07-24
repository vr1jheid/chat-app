import { createAsyncThunk } from "@reduxjs/toolkit";

import { setActive } from "../../ActiveChat/activeChat";
import { cacheMessages } from "../../ActiveChat/thunks/cacheMessages";
import { setInitialMessages } from "../../ActiveChat/thunks/setInitialMessages";
import { subOnChat } from "../../ActiveChat/thunks/subOnChat";
import { RootState } from "../../store";
import { resetUnseenMessages } from "../chats";

export const selectChatFromObserved = createAsyncThunk(
  "test",
  (id: string, { getState, dispatch }) => {
    const { chatsList, activeChat } = getState() as RootState;
    const { chats } = chatsList;
    if (id === activeChat.id) return;

    dispatch(resetUnseenMessages(id));
    dispatch(cacheMessages());
    dispatch(setActive(chats[id]));
    dispatch(setInitialMessages(chats[id]));
    dispatch(subOnChat({ action: "sub", chatID: id }));
  }
);
