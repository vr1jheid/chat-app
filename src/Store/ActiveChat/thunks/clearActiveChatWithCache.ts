import { createAsyncThunk } from "@reduxjs/toolkit";
import { cacheMessages } from "./cacheMessages";
import { clearSizes } from "../../MessagesSizes/messagesSizes";
import { subOnChat } from "./subOnChat";

export const clearActiveChatWithCache = createAsyncThunk(
  "activeChat/clearActiveChatWithCache",
  (_, { dispatch }) => {
    dispatch(cacheMessages());
    dispatch(clearSizes());
    dispatch(subOnChat({ action: "unsub" }));
  }
);
