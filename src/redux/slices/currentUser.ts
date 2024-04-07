import { createSlice } from "@reduxjs/toolkit";

export interface currentUserState {
  uid: string;
  email: string | null;
  displayName: string | null;
  avatarURL: string | null;
  emailVerified: boolean;
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

export const { selectUser, selectUserUID, selectUserIsLoaded } =
  currentUserSlice.selectors;
export const { setUser, clearUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
