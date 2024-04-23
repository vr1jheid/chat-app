import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "../../Services/fetchChats";
import { createChat } from "../../Services/createChat";
import { ChatDataDB, ChatTypes } from "../../Components/Types/chatTypes";
import { MessageData } from "../../Components/Chat/Chat";

export interface AllUserChats {
  [key: string]: ChatDataDB;
}

export interface LocalChatData extends ChatDataDB {
  messages: MessageData[];
}

export interface ChatsState {
  allChats: AllUserChats;
  activeChat: LocalChatData;
}

const initialState: ChatsState = {
  allChats: {},
  activeChat: {
    id: "mainChat",
    members: [],
    type: ChatTypes.group,
    messages: [],
  },
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  selectors: {
    selectAllChats: (state) => state.allChats,
    selectActiveChat: (state) => state.activeChat,
  },
  reducers: {
    setActive: (state, action: PayloadAction<string>) => {
      const newActiveChat = Object.values(state.allChats).find(
        (c) => c.id === action.payload
      );
      if (!newActiveChat) return;
      state.activeChat = { ...newActiveChat, messages: [] };
    },
    setMessages: ({ activeChat }, action: PayloadAction<MessageData[]>) => {
      activeChat.messages = action.payload;
    },
    addMessage: ({ activeChat }, action: PayloadAction<MessageData>) => {
      activeChat.messages.unshift(action.payload);
    },
    clearChatsState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.allChats = action.payload;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        console.log(action.payload);
        const newChat = action.payload;
        state.allChats = { ...state.allChats, ...{ [newChat.id]: newChat } };
        state.activeChat = { ...newChat, messages: [] };
      });
  },
});

export const { selectAllChats, selectActiveChat } = chatsSlice.selectors;

export const { setActive, setMessages, addMessage, clearChatsState } =
  chatsSlice.actions;

export default chatsSlice.reducer;
