import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { setActiveAndCacheMessages } from "../../ActiveChat/thunks/setActiveAndCacheMessages";
import { setInitialMessages } from "../../ActiveChat/thunks/setInitialMessages";
import { clearSizes } from "../../MessagesSizes/messagesSizes";

export const selectChatFromObserved = createAsyncThunk(
  "test",
  (id: string, { getState, dispatch }) => {
    console.log("thunk");

    const { chats } = getState() as RootState;
    console.log(chats);
    console.log(id);

    const selectedChat = chats[id];
    console.log(selectedChat);

    dispatch(setActiveAndCacheMessages(selectedChat));
    dispatch(setInitialMessages(selectedChat));
    dispatch(clearSizes());
  }
);
