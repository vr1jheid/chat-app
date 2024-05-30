import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Size {
  width: number;
  height: number;
}

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const screenSizeSlice = createSlice({
  name: "screenSize",
  initialState,
  selectors: {
    selectScreenSize: (state) => state,
  },
  reducers: {
    setScreenSize: (_state, { payload }: PayloadAction<Size>) => {
      return payload;
    },
  },
});

export const { setScreenSize } = screenSizeSlice.actions;

export const { selectScreenSize } = screenSizeSlice.selectors;

export default screenSizeSlice.reducer;
