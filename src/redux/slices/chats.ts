import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "../../Services/fetchChats";
import { createChat } from "../../Services/createChat";
import { ChatDataDB, ChatTypes } from "../../Types/chatTypes";
import { MessageData } from "../../Types/messageTypes";
import { convertServerTime } from "../../utils/convertServerTime";

export interface AllUserChats {
  [key: string]: ChatDataDB;
}

export interface LocalChatData extends ChatDataDB {
  messages: MessageData[];
  isLoading: boolean;
}

export interface ChatsState {
  allChats: AllUserChats;
  activeChat: LocalChatData;
}

const initialState: ChatsState = {
  allChats: {},
  activeChat: {
    id: "",
    members: [],
    type: ChatTypes.group,
    messages: [],
    isLoading: false,
  },
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  selectors: {
    selectAllChats: (state) => state.allChats,
    selectActiveChat: (state) => state.activeChat,
    selectActiveChatLoading: (state) => state.activeChat.isLoading,
  },
  reducers: {
    setActive: (state, action: PayloadAction<string>) => {
      const newActiveChat = Object.values(state.allChats).find(
        (c) => c.id === action.payload
      );
      if (!newActiveChat) return;
      state.activeChat = { ...newActiveChat, messages: [], isLoading: true };
    },
    setMessages: ({ activeChat }, action: PayloadAction<MessageData[]>) => {
      activeChat.messages = action.payload.sort(
        (a, b) => b.serverTime!.seconds! - a.serverTime!.seconds
      );
      activeChat.isLoading = false;
    },
    addMessage: ({ activeChat }, action: PayloadAction<MessageData>) => {
      const existableMsgIndex = activeChat.messages.findIndex(
        (m) => m.id === action.payload.id
      );
      if (existableMsgIndex !== -1) {
        activeChat.messages[existableMsgIndex] = action.payload;
        return;
      }
      activeChat.messages.unshift(action.payload);
    },
    changeLastMessage: (state, { payload }: PayloadAction<ChatDataDB>) => {
      const correctServerTime = convertServerTime(payload.lastMessage);
      if (!correctServerTime) return;

      const newLastMessage = {
        ...payload.lastMessage,
        serverTime: correctServerTime,
      } as MessageData;
      state.allChats[payload.id].lastMessage = newLastMessage;
    },
    clearChatsState: () => {
      return initialState;
    },
    clearActiveChat: (state) => {
      state.activeChat = initialState.activeChat;
    },
    setActiveChatLoading: (state, action) => {
      state.activeChat.isLoading = action.payload;
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
        state.activeChat = { ...newChat, messages: [], isLoading: false };
      });
  },
});

export const { selectAllChats, selectActiveChat, selectActiveChatLoading } =
  chatsSlice.selectors;

export const {
  setActive,
  setMessages,
  addMessage,
  clearChatsState,
  changeLastMessage,
  setActiveChatLoading,
  clearActiveChat,
} = chatsSlice.actions;

export default chatsSlice.reducer;
