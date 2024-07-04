import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { setCachedMessages, setHasNextPage } from "../../Chats/chats";
import { ChatLocalCache } from "../../../Types/chatTypes";

export const cacheMessages = createAsyncThunk(
  "activeChat/cacheMessages",
  (_, { getState, dispatch }) => {
    const { activeChat } = getState() as RootState;

    if (activeChat.messages.length && activeChat.id) {
      const localCache: ChatLocalCache = {
        cachedMessages: activeChat.messages,
        hasNextPage: activeChat.hasNextPage,
      };
      localStorage.setItem(activeChat.id, JSON.stringify(localCache));
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
