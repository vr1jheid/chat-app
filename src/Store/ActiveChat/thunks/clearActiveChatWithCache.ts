import { createAsyncThunk } from "@reduxjs/toolkit";

import { cacheMessages } from "./cacheMessages";
import { subOnChat } from "./subOnChat";

export const clearActiveChatWithCache = createAsyncThunk(
  "activeChat/clearActiveChatWithCache",
  (_, { dispatch }) => {
    dispatch(cacheMessages());
    dispatch(subOnChat({ action: "unsub" }));
  }
);
