import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "./thunks/fetchChats";
import { createChat } from "./thunks/createChat";
import { ChatDataDB } from "../../Types/chatTypes";
import { MessageData } from "../../Types/messageTypes";

export interface ChatsState {
  [key: string]: ChatDataDB;
}

export interface LastMessageWithID {
  chatID: string;
  message: MessageData;
}

const initialState: ChatsState = {};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  selectors: {
    selectAllChats: (state) => state,
    selectChatsNum: (state) => Object.keys(state).length,
  },
  reducers: {
    changeLastMessage: (
      state,
      { payload }: PayloadAction<LastMessageWithID>
    ) => {
      state[payload.chatID].lastMessage = payload.message;
    },
    clearChatsState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.fulfilled, (_state, action) => {
        return action.payload;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        const newChat = action.payload;
        state[newChat.id] = newChat;
      });
  },
});

export const { selectAllChats, selectChatsNum } = chatsSlice.selectors;

export const { clearChatsState, changeLastMessage } = chatsSlice.actions;

export default chatsSlice.reducer;
