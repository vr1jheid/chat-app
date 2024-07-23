import { combineSlices, configureStore } from "@reduxjs/toolkit";

import { activeChatSlice } from "./ActiveChat/activeChat";
import { allUsersListSlice } from "./AllUsersList/allUsersList";
import { chatsSlice } from "./Chats/chats";
import { currentUserSlice } from "./CurrentUser/currentUser";
import { modalSlice } from "./Modal/modalSlice";
import { registerFormSlice } from "./RegisterForm/registerFormSlice";
import { windowSizeSlice } from "./WindowSize/windowSize";

const rootReducer = combineSlices(
  currentUserSlice,
  chatsSlice,
  activeChatSlice,
  allUsersListSlice,
  modalSlice,
  registerFormSlice,
  windowSizeSlice
);

export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
