import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Size {
  width: number;
  height: number;
}

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export const windowSizeSlice = createSlice({
  name: "windowSize",
  initialState,
  selectors: {
    selectWindowSize: (state) => state,
  },
  reducers: {
    setWindowSize: (_state, { payload }: PayloadAction<Size>) => {
      return payload;
    },
  },
});

export const { setWindowSize } = windowSizeSlice.actions;

export const { selectWindowSize } = windowSizeSlice.selectors;
