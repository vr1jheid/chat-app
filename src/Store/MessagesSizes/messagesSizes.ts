import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface MessagesSizesMap {
  [key: string]: number;
}

const initialState: MessagesSizesMap = {};

const messagesSizesSlice = createSlice({
  name: "messagesSizes",
  initialState,
  selectors: {
    selectMessagesSizes: (state) => state,
  },
  reducers: {
    setSize: (
      state,
      action: PayloadAction<{ index: number; size: number }>
    ) => {
      state[action.payload.index] = action.payload.size;
    },
  },
});

export const { setSize } = messagesSizesSlice.actions;
export const { selectMessagesSizes } = messagesSizesSlice.selectors;

export default messagesSizesSlice.reducer;
