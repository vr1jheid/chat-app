import { configureStore } from "@reduxjs/toolkit";
import currenUserReducer from "./CurrentUser/currentUser";
import chatsReducer from "./Chats/chats";
import activeChatReducer from "./ActiveChat/activeChat";

const store = configureStore({
  reducer: {
    currentUser: currenUserReducer,
    chats: chatsReducer,
    activeChat: activeChatReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;