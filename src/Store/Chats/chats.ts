import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "./thunks/fetchChats";
import { ChatData } from "../../Types/chatTypes";
import { MessageData } from "../../Types/messageTypes";

export interface ChatsState {
  [key: string]: ChatData;
}

export interface LastMessageWithChatID {
  chatID: string;
  message: MessageData;
}

export interface CachedMessagesWithChatID {
  chatID: string;
  messages: MessageData[];
}

export interface HasNextPageWithChatID {
  chatID: string;
  hasNextPage: boolean;
}

const initialState: ChatsState = {};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  selectors: {
    selectAllChats: (state) => state,
    selectChatsIDs: createSelector(
      (state) => state,
      (state) => Object.keys(state)
    ),
    selectChatsNum: (state) => Object.keys(state).length,
  },
  reducers: {
    changeLastMessage: (
      state,
      { payload }: PayloadAction<LastMessageWithChatID>
    ) => {
      state[payload.chatID].lastMessage = payload.message;
    },
    setCachedMessages: (
      state,
      { payload }: PayloadAction<CachedMessagesWithChatID>
    ) => {
      state[payload.chatID].cachedMessages = payload.messages;
    },
    setHasNextPage: (
      state,
      { payload }: PayloadAction<HasNextPageWithChatID>
    ) => {
      state[payload.chatID].hasNextPage = payload.hasNextPage;
    },
    clearChats: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
  },
});

export const { selectAllChats, selectChatsNum, selectChatsIDs } =
  chatsSlice.selectors;

export const selectChatByID = createSelector(
  [
    // Pass input selectors with typed arguments
    selectAllChats,
    (_chats, id: string) => id,
  ],
  // Extracted values are passed to the result function for recalculation
  (chats, id) => chats[id]
);

export const {
  clearChats,
  changeLastMessage,
  setCachedMessages,
  setHasNextPage,
} = chatsSlice.actions;

export default chatsSlice.reducer;
