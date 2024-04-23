import { configureStore } from "@reduxjs/toolkit";
import currenUserReducer from "./slices/currentUser";

import chatsReducer from "./slices/chats";

const store = configureStore({
  reducer: {
    currentUser: currenUserReducer,
    chats: chatsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
