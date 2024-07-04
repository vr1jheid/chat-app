import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "./thunks/fetchChats";
import { ActiveChat, ChatData } from "../../Types/chatTypes";
import { MessageData } from "../../Types/messageTypes";

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
      { payload }: PayloadAction<LastMessageSetter>
    ) => {
      state[payload.chatID].lastMessage = payload.message;
    },
    setCachedMessages: (
      state,
      { payload }: PayloadAction<CachedMessagesSetter>
    ) => {
      state[payload.chatID].cachedMessages = payload.messages;
    },
    setHasNextPage: (state, { payload }: PayloadAction<HasNextPageSetter>) => {
      state[payload.chatID].hasNextPage = payload.hasNextPage;
    },
    setUnseenMessages: (
      state,
      { payload }: PayloadAction<UnseenMessagesSetter>
    ) => {
      state[payload.chatID].unseenMessages = payload.unseenMessages;
    },
    increaseUnseenMessages: (state, { payload }: PayloadAction<string>) => {
      state[payload].unseenMessages = state[payload].unseenMessages + 1;
    },
    resetUnseenMessages: (state, { payload }: PayloadAction<string>) => {
      state[payload].unseenMessages = 0;
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
  [selectAllChats, (_chats, id: string) => id],
  (chats, id) => chats[id]
);

export const {
  clearChats,
  changeLastMessage,
  setCachedMessages,
  setHasNextPage,
  setUnseenMessages,
  increaseUnseenMessages,
  resetUnseenMessages,
} = chatsSlice.actions;

export default chatsSlice.reducer;
