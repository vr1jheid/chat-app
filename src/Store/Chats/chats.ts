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
    clearChats: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChats.fulfilled, (_state, action) => action.payload);
  },
});

export const { selectAllChats, selectChatsNum, selectChatsIDs } =
  chatsSlice.selectors;

export const { clearChats, changeLastMessage } = chatsSlice.actions;

export default chatsSlice.reducer;
