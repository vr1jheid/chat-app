import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MutableRefObject } from "react";
import { VariableSizeList } from "react-window";

const initialState: any = {};

const messagesListRefSlice = createSlice({
  name: "messagesListRef",
  initialState,
  selectors: {
    selectMessagesListRef: (state) => state,
  },
  reducers: {
    setMessagesListRef: (state, action) => {
      console.log("12");
      state.listRef = action.payload;
      /*      return action.payload; */
    },
  },
});

export const { setMessagesListRef } = messagesListRefSlice.actions;
export const { selectMessagesListRef } = messagesListRefSlice.selectors;

export default messagesListRefSlice.reducer;
