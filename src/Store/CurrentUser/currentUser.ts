import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserDataDB } from "../../Types/userTypes";

export interface currentUserState extends UserDataDB {
  isLoaded: boolean;
}

const initialState: currentUserState = {
  uid: "",
  email: "",
  displayName: "",
  avatarURL: "",
  emailVerified: false,
  chats: {},
  isLoaded: false,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  selectors: {
    selectCurrentUser: (state) => state,
    selectCurrentUserEmail: (state) => state.email,
    selectCurrentUserAvatar: (state) => state.avatarURL,
    selectCurrentUserName: (state) => state.displayName,
    selectUserChatsCount: (state) => state.chats.length,
  },
  reducers: {
    updateUserData: (_state, { payload }: PayloadAction<UserDataDB>) => {
      return { ...payload, isLoaded: true };
    },
    setUserEmail: (state, { payload }: PayloadAction<string>) => {
      state.email = payload;
    },
    clearUser: () => {
      return { ...initialState, isLoaded: true };
    },
    setIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload;
    },
  },
});

export const {
  selectCurrentUser,
  selectCurrentUserEmail,
  selectUserChatsCount,
  selectCurrentUserAvatar,
  selectCurrentUserName,
} = currentUserSlice.selectors;

export const selectUserData = createSelector(
  [selectCurrentUserEmail, selectCurrentUserName, selectCurrentUserAvatar],
  (email, displayName, avatarURL) => {
    return { email, displayName, avatarURL };
  }
);

export const selectChatParams = createSelector(
  [selectCurrentUser, (_user, id) => id],
  (user, id) => user.chats[id]
);

export const { updateUserData, setUserEmail, clearUser } =
  currentUserSlice.actions;
