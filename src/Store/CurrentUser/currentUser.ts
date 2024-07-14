import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
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
} = currentUserSlice.selectors;

export const selectChatParams = createSelector(
  [selectCurrentUser, (_user, id) => id],
  (user, id) => user.chats[id]
);

export const { updateUserData, setUserEmail, clearUser } =
  currentUserSlice.actions;
