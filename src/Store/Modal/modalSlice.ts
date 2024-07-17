import { createSlice,PayloadAction } from "@reduxjs/toolkit";

type ModalTypes = "userInfo";

interface ModalSliceState {
  type: ModalTypes | "";
  data?: any;
}

const initialState: ModalSliceState = {
  type: "",
  data: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  selectors: {
    selectModalState: (state) => state,
  },
  reducers: {
    setModal: (_, { payload }: PayloadAction<ModalSliceState>) => {
      return payload;
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const { selectModalState } = modalSlice.selectors;

export const { setModal, closeModal } = modalSlice.actions;
