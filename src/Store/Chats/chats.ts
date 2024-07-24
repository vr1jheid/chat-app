import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ActiveChat, ChatData } from "../../Types/chatTypes";
import { MessageData } from "../../Types/messageTypes";
import { fetchChats } from "./thunks/fetchChats";

interface ChatsSlice {
  chats: { [key: string]: ChatData };
  isLoading: boolean;
}

export interface ChatsState {
  [key: string]: ChatData;
}

export interface LastMessageSetter {
  chatID: string;
  message: MessageData;
}

export interface CachedMessagesSetter extends Pick<ActiveChat, "messages"> {
  chatID: string;
}

export interface HasNextPageSetter extends Pick<ActiveChat, "hasNextPage"> {
  chatID: string;
}

export interface UnseenMessagesSetter {
  chatID: string;
  unseenMessages: number;
}

const initialState: ChatsSlice = {
  chats: {},
  isLoading: false,
};

export const chatsSlice = createSlice({
  name: "chatsList",
  initialState,
  selectors: {
    selectChatsSlice: (state) => state,
    selectAllChats: (state) => state.chats,
  },
  reducers: {
    changeLastMessage: (
      { chats },
      { payload }: PayloadAction<LastMessageSetter>
    ) => {
      chats[payload.chatID].lastMessage = payload.message;
    },
    setCachedMessages: (
      { chats },
      { payload }: PayloadAction<CachedMessagesSetter>
    ) => {
      chats[payload.chatID].cachedMessages = payload.messages;
    },
    setHasNextPage: (
      { chats },
      { payload }: PayloadAction<HasNextPageSetter>
    ) => {
      chats[payload.chatID].hasNextPage = payload.hasNextPage;
    },
    setUnseenMessages: (
      { chats },
      { payload }: PayloadAction<UnseenMessagesSetter>
    ) => {
      chats[payload.chatID].unseenMessages = payload.unseenMessages;
    },
    increaseUnseenMessages: ({ chats }, { payload }: PayloadAction<string>) => {
      chats[payload].unseenMessages = chats[payload].unseenMessages + 1;
    },
    resetUnseenMessages: ({ chats }, { payload }: PayloadAction<string>) => {
      chats[payload].unseenMessages = 0;
    },
    clearChats: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChats.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchChats.fulfilled, (state, { payload }) => {
      state.chats = { ...state.chats, ...payload };
      state.isLoading = false;
    });
    builder.addCase(fetchChats.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { selectAllChats, selectChatsSlice } = chatsSlice.selectors;

export const {
  clearChats,
  changeLastMessage,
  setCachedMessages,
  setHasNextPage,
  setUnseenMessages,
  increaseUnseenMessages,
  resetUnseenMessages,
} = chatsSlice.actions;
