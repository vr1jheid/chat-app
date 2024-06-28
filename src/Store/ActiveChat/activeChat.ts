import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ActiveChat, ChatData, ChatTypes } from "../../Types/chatTypes";
import { createChat } from "./thunks/createChat";
import { MessageData } from "../../Types/messageTypes";
import { setInitialMessages } from "./thunks/setInitialMessages";
import { loadNextPage } from "./thunks/loadNextPage";
import { clearActiveChatWithCache } from "./thunks/clearActiveChatWithCache";

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

const activeChatSlice = createSlice({
  name: "activeChat",
  initialState,
  selectors: {
    selectActiveChat: (state) => state,
    selectActiveChatLoading: (state) => state.isLoading,
    selectActiveChatID: (state) => state.id,
    selectActiveChatMessagesCount: (state) => state.messages.length,
    selectActiveChatNextPageLoading: (state) => state.isNextPageLoading,
    selectActiveChatHasNextPage: (state) => state.hasNextPage,
  },
  reducers: {
    setActive: (_state, action: PayloadAction<ChatData>) => {
      const { lastMessage, cachedMessages, ...newActiveChat } = action.payload;
      return {
        ...newActiveChat,
        messages: [],
        isLoading: false,
        isNextPageLoading: false,
        hasNextPage: true,
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
      return {
        ...action.payload,
        messages: [],
        isLoading: false,
        isNextPageLoading: false,
        hasNextPage: false,
      };
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
      console.log(action.payload.length, action.payload);

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
} = activeChatSlice.selectors;

export default activeChatSlice.reducer;
