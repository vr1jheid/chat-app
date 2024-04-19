import { createSlice } from "@reduxjs/toolkit";
import { UserDataDB } from "../../Components/Types/userTypes";

const initialState: UserDataDB = {
  uid: "",
  email: "",
  displayName: "",
  avatarURL: "",
  emailVerified: false,
};

const dialogPartnerSlice = createSlice({
  name: "dialogPartner",
  initialState,
  selectors: {
    selectDialogPartner: (state) => state,
  },
  reducers: {
    setDialogPartner: (state, action) => {
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
