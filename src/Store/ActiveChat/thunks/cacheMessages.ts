import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { setCachedMessages, setHasNextPage } from "../../Chats/chats";

export const cacheMessages = createAsyncThunk(
  "activeChat/cacheMessages",
  (_, { getState, dispatch }) => {
    const { activeChat } = getState() as RootState;

    if (activeChat.messages.length && activeChat.id) {
      dispatch(
        setCachedMessages({
          chatID: activeChat.id,
          messages: activeChat.messages,
        })
      );
    }

    if (!activeChat.hasNextPage) {
      dispatch(
        setHasNextPage({
          chatID: activeChat.id,
          hasNextPage: activeChat.hasNextPage,
        })
      );
    }
  }
);
