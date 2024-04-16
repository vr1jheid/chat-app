import { createSlice } from "@reduxjs/toolkit";
import { DocumentData, DocumentReference } from "firebase/firestore";
import { MessageData } from "../../Components/Chat/Chat";
import { fetchChats } from "../../Services/fetchChats";
import { createChat } from "../../Services/createChat";

export interface ChatData {
  members: string[];
  lastMessage?: MessageData;
}

export interface ChatsState {
  [key: string]: ChatData;
}

const initialState: ChatsState = {};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  selectors: {
    selectAllChats: (state) => state,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.fulfilled, (state, action) => {
        console.log(action.payload);
        return action.payload;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
      });
  },
});

export const { selectAllChats } = chatsSlice.selectors;
export default chatsSlice.reducer;
