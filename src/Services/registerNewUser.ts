import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../main";
import createUserData from "../utils/createUserData";
import { enqueueSnackbar } from "notistack";
import { RegisterFormDataKeys } from "../Components/Auth/types/authTypes";
import createUserInDB from "./createUserInDB";

export const registerNewUser = async ({
  email,
  password,
  userName,
}: Record<RegisterFormDataKeys, string>) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof Error) {
      enqueueSnackbar("Registration failed", { variant: "error" });
    }
  }
  if (!auth.currentUser) return;
  try {
    updateProfile(auth.currentUser, { displayName: userName });
    createUserInDB(
      createUserData({ ...auth.currentUser, displayName: userName })
    );
  } catch {
    enqueueSnackbar("Error updating profile", { variant: "error" });
  }
};
