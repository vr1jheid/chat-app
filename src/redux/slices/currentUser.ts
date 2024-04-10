import { createSlice } from "@reduxjs/toolkit";
import { UserDataDB } from "../../utils/createUserData";

export interface currentUserState extends UserDataDB {
  isLoaded: boolean;
}

const initialState: currentUserState = {
  uid: "",
  email: "",
  displayName: "",
  avatarURL: "",
  emailVerified: false,
  isLoaded: false,
};

interface SetUserAction {
  type: string;
  payload: currentUserState;
}

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  selectors: {
    selectUser: (state) => state,
    selectUserEmail: (state) => state.email,
    selectUserName: (state) => state.displayName,
    selectAvatarURL: (state) => state.avatarURL,
    selectUserUID: (state) => state.uid,
    selectUserIsLoaded: (state) => state.isLoaded,
  },
  reducers: {
    setUser: (state, action: SetUserAction) => {
      return action.payload;
    },
    clearUser: () => {
      return { ...initialState, isLoaded: true };
    },
    setIsLoaded: (state, action) => {
      state.isLoaded = action.payload;
    },
  },
});

export const {
  selectUser,
  selectUserUID,
  selectUserIsLoaded,
  selectUserEmail,
  selectUserName,
  selectAvatarURL,
} = currentUserSlice.selectors;
export const { setUser, clearUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
