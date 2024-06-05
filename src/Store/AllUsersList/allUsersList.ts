import { createSlice } from "@reduxjs/toolkit";
import getAllUsersEmailsFromDB from "./thunks/fetchAllUsersFromDB";

const initialState: string[] = [];

const allUsersListSlice = createSlice({
  name: "allUsersList",
  initialState,
  selectors: {
    selectAllUsersList: (state) => state,
  },
  reducers: {
    clearAllUsersList: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllUsersEmailsFromDB.fulfilled,
      (_state, action) => action.payload
    );
  },
});
export const { clearAllUsersList } = allUsersListSlice.actions;

export const { selectAllUsersList } = allUsersListSlice.selectors;

export default allUsersListSlice.reducer;
