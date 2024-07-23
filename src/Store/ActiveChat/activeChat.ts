import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ActiveChat, ChatData, ChatTypes } from "../../Types/chatTypes";
import { MessageData } from "../../Types/messageTypes";
import { clearActiveChatWithCache } from "./thunks/clearActiveChatWithCache";
import { createChat } from "./thunks/createChat";
import { loadNextPage } from "./thunks/loadNextPage";
import { setInitialMessages } from "./thunks/setInitialMessages";

export const ITEMS_PER_PAGE = 30;

const initialState: ActiveChat = {
  id: "",
  members: [],
  type: ChatTypes.group,
  messages: [],
  isLoading: false,
  hasNextPage: true,
  isNextPageLoading: false,
};

export const activeChatSlice = createSlice({
  name: "activeChat",
  initialState,
  selectors: {
    selectActiveChat: (state) => state,
    selectActiveChatLoading: (state) => state.isLoading,
    selectActiveChatID: (state) => state.id,
    selectActiveChatType: (state) => state.type,
    selectActiveChatMessagesCount: (state) => state.messages.length,
    selectActiveChatNextPageLoading: (state) => state.isNextPageLoading,
    selectActiveChatHasNextPage: (state) => state.hasNextPage,
    selectActiveChatDialogPartner: (state) => state.dialogPartner,
  },
  reducers: {
    setActive: (_state, action: PayloadAction<ChatData>) => {
      const { lastMessage, cachedMessages, ...newActiveChat } = action.payload;
      return {
        ...newActiveChat,
        messages: [],
        isLoading: false,
        isNextPageLoading: false,
      };
    },
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
      return action.payload;
    });

    builder.addCase(setInitialMessages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(setInitialMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
      if (action.payload.length < 30) {
        state.hasNextPage = false;
      }
      state.isLoading = false;
    });
    builder.addCase(setInitialMessages.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(loadNextPage.pending, (state) => {
      state.isNextPageLoading = true;
    });
    builder.addCase(loadNextPage.fulfilled, (state, action) => {
      state.messages = [...state.messages, ...action.payload];
      if (action.payload.length < ITEMS_PER_PAGE) {
        state.hasNextPage = false;
      }
      state.isNextPageLoading = false;
    });
    builder.addCase(loadNextPage.rejected, (state) => {
      state.isNextPageLoading = false;
    });
    builder.addCase(clearActiveChatWithCache.fulfilled, () => initialState);
  },
});

export const { setActive, addMessage, clearActiveChat } =
  activeChatSlice.actions;

export const {
  selectActiveChat,
  selectActiveChatLoading,
  selectActiveChatID,
  selectActiveChatMessagesCount,
  selectActiveChatHasNextPage,
  selectActiveChatNextPageLoading,
  selectActiveChatDialogPartner,
  selectActiveChatType,
} = activeChatSlice.selectors;
