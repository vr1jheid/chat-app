import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "../../Services/fetchChats";
import { createChat } from "../../Services/createChat";
import { ChatData } from "../../Components/Types/chatTypes";

export interface AllUserChats {
  [key: string]: ChatData;
}

export interface ChatsState {
  allChats: AllUserChats;
  activeChat: ChatData;
}

const initialState: ChatsState = {
  allChats: {},
  activeChat: {
    id: "",
    members: [],
    type: null,
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
      if (newActiveChat) {
        state.activeChat = newActiveChat;
      }
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
        state.activeChat = newChat;
      });
  },
});

export const { selectAllChats, selectActiveChat } = chatsSlice.selectors;

export const { setActive } = chatsSlice.actions;

export default chatsSlice.reducer;
