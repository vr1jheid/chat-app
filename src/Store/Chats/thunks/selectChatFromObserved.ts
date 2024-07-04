import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { cacheMessages } from "../../ActiveChat/thunks/cacheMessages";
import { setInitialMessages } from "../../ActiveChat/thunks/setInitialMessages";
import { clearSizes } from "../../MessagesSizes/messagesSizes";
import { subOnChat } from "../../ActiveChat/thunks/subOnChat";
import { setActive } from "../../ActiveChat/activeChat";
import { resetUnseenMessages } from "../chats";

export const selectChatFromObserved = createAsyncThunk(
  "test",
  (id: string, { getState, dispatch }) => {
    const { chats, activeChat } = getState() as RootState;
    if (id === activeChat.id) return;

    dispatch(resetUnseenMessages(id));
    dispatch(clearSizes());
    dispatch(cacheMessages());
    dispatch(setActive(chats[id]));
    dispatch(setInitialMessages(chats[id]));
    dispatch(subOnChat({ action: "sub", chatID: id }));
  }
);
