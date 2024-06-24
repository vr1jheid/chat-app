import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { setActiveAndCacheMessages } from "../../ActiveChat/thunks/setActiveAndCacheMessages";
import { setInitialMessages } from "../../ActiveChat/thunks/setInitialMessages";
import { clearSizes } from "../../MessagesSizes/messagesSizes";

export const selectChatFromObserved = createAsyncThunk(
  "test",
  (id: string, { getState, dispatch }) => {
    const { chats, activeChat } = getState() as RootState;
    if (id === activeChat.id) return;

    dispatch(setActiveAndCacheMessages(chats[id]));
    dispatch(setInitialMessages(chats[id]));
    dispatch(clearSizes());
  }
);
