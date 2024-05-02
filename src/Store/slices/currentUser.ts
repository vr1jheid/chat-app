import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserDataDB } from "../../Types/userTypes";

export interface currentUserState extends UserDataDB {
  displayName: string;
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

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  selectors: {
    selectCurrentUser: (state) => state,
  },
  reducers: {
    setUser: (_state, action: PayloadAction<currentUserState>) => {
      return action.payload;
    },
    clearUser: () => {
      return { ...initialState, isLoaded: true };
    },
    setIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload;
    },
  },
});

export const { selectCurrentUser } = currentUserSlice.selectors;
export const { setUser, clearUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
