import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChatData } from "../../../Types/chatTypes";
import { RootState } from "../../store";
import { setCachedMessages, setHasNextPage } from "../../Chats/chats";
import { setActive } from "../activeChat";

export const setActiveAndCacheMessages = createAsyncThunk(
  "activeChat/setActiveAndCacheMessages",
  (chat: ChatData, { getState, dispatch }) => {
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

    dispatch(setActive(chat));
  }
);
