import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "../../Services/fetchChats";
import { createChat } from "../../Services/createChat";
import { ChatDataDB } from "../../Types/chatTypes";
import { MessageData } from "../../Types/messageTypes";
import { convertServerTime } from "../../utils/convertServerTime";

export interface ChatsState {
  [key: string]: ChatDataDB;
}

const initialState: ChatsState = {};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  selectors: {
    selectAllChats: (state) => state,
  },
  reducers: {
    changeLastMessage: (state, { payload }: PayloadAction<ChatDataDB>) => {
      const correctServerTime = convertServerTime(payload.lastMessage);
      if (!correctServerTime) return;

      const newLastMessage = {
        ...payload.lastMessage,
        serverTime: correctServerTime,
      } as MessageData;
      state[payload.id].lastMessage = newLastMessage;
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

export const { selectAllChats } = chatsSlice.selectors;

export const { clearChatsState, changeLastMessage } = chatsSlice.actions;

export default chatsSlice.reducer;
