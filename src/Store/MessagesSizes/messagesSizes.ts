import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface MessagesSizesMap {
  [key: string]: number;
}

const initialState: MessagesSizesMap = {};

export const messagesSizesSlice = createSlice({
  name: "messagesSizes",
  initialState,
  selectors: {
    selectMessagesSizes: (state) => state,
  },
  reducers: {
    setSize: (state, action: PayloadAction<{ id: string; size: number }>) => {
      state[action.payload.id] = action.payload.size;
    },
    clearSizes: () => {
      return initialState;
    },
  },
});

export const { setSize, clearSizes } = messagesSizesSlice.actions;
export const { selectMessagesSizes } = messagesSizesSlice.selectors;
