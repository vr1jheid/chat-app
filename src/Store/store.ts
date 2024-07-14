import { configureStore } from "@reduxjs/toolkit";
import currenUserReducer from "./CurrentUser/currentUser";
import chatsReducer from "./Chats/chats";
import activeChatReducer from "./ActiveChat/activeChat";
import messagesSizesReducer from "./MessagesSizes/messagesSizes";
import windowSizeReducer from "./WindowSize/windowSize";
import allUsersListReducer from "./AllUsersList/allUsersList";
import registerFormSliceReducer from "./RegisterForm/registerFormSlice";

const store = configureStore({
  reducer: {
    currentUser: currenUserReducer,
    chats: chatsReducer,
    activeChat: activeChatReducer,
    messagesSizes: messagesSizesReducer,
    windowSize: windowSizeReducer,
    allUsersList: allUsersListReducer,
    registerForm: registerFormSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
