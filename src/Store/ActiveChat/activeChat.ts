import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ActiveChat, ChatData, ChatTypes } from "../../Types/chatTypes";
import { createChat } from "./thunks/createChat";
import { MessageData } from "../../Types/messageTypes";
import { setInitialMessages } from "./thunks/setInitialMessages";

const initialState: ActiveChat = {
  id: "",
  members: [],
  type: ChatTypes.group,
  messages: [],
  isLoading: false,
};

const activeChatSlice = createSlice({
  name: "activeChat",
  initialState,
  selectors: {
    selectActiveChat: (state) => state,
    selectActiveChatLoading: (state) => state.isLoading,
    selectActiveChatID: (state) => state.id,
    selectActiveChatMessagesCount: (state) => state.messages.length,
  },
  reducers: {
    setActive: (_state, action: PayloadAction<ChatData>) => {
      const { lastMessage, cachedMessages, ...newActiveChat } = action.payload;
      return { ...newActiveChat, messages: [], isLoading: false };
    },
    /*     setMessages: (state, action: PayloadAction<MessageData[]>) => {
      state.messages = action.payload.sort(
        (a, b) => b.serverTime!.seconds! - a.serverTime!.seconds!
      );

      state.isLoading = false;
    }, */
    addMessage: (state, action: PayloadAction<MessageData>) => {
      const existableMsgIndex = state.messages.findIndex(
        (m) => m.id === action.payload.id
      );
      if (existableMsgIndex !== -1) {
        state.messages[existableMsgIndex] = action.payload;
        return;
      }
      state.messages.unshift(action.payload);
    },
    clearActiveChat: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createChat.fulfilled, (_state, action) => {
      return { ...action.payload, messages: [], isLoading: false };
    });

    builder.addCase(setInitialMessages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(setInitialMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
      state.isLoading = false;
    });
  },
});

export const { setActive, addMessage, /* setMessages, */ clearActiveChat } =
  activeChatSlice.actions;

export const {
  selectActiveChat,
  selectActiveChatLoading,
  selectActiveChatID,
  selectActiveChatMessagesCount,
} = activeChatSlice.selectors;

export default activeChatSlice.reducer;
