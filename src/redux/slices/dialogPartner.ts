import { createSlice } from "@reduxjs/toolkit";
import { UserDataDB } from "../../utils/createUserData";

const initialState: UserDataDB = {
  uid: "",
  email: "",
  displayName: "",
  avatarURL: "",
  emailVerified: false,
};

interface SetDialogPartnerAction {
  type: string;
  payload: UserDataDB;
}

const dialogPartnerSlice = createSlice({
  name: "dialogPartner",
  initialState,
  selectors: {
    selectDialogPartner: (state) => state,
  },
  reducers: {
    setDialogPartner: (state, action: SetDialogPartnerAction) => {
      return action.payload;
    },
    clearDialogPartner: () => {
      return initialState;
    },
  },
});

export const { selectDialogPartner } = dialogPartnerSlice.selectors;

export const { setDialogPartner, clearDialogPartner } =
  dialogPartnerSlice.actions;

export default dialogPartnerSlice.reducer;
