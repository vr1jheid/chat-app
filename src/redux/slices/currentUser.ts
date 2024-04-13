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

interface SetIsLoadedAction {
  type: string;
  payload: boolean;
}

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  selectors: {
    selectCurrentUser: (state) => state,
  },
  reducers: {
    setUser: (state, action: SetUserAction) => {
      return action.payload;
    },
    clearUser: () => {
      return { ...initialState, isLoaded: true };
    },
    setIsLoaded: (state, action: SetIsLoadedAction) => {
      state.isLoaded = action.payload;
    },
  },
});

export const { selectCurrentUser } = currentUserSlice.selectors;
export const { setUser, clearUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
