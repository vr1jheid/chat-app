import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { RegisterDataKeys } from "../Components/Auth/types/authTypes";
import { auth } from "../main";
import createUserData from "../utils/createUserData";
import createUserInDB from "./createUserInDB";
import { enqueueSnackbar } from "notistack";

type RegisterDataValues = {
  [K in RegisterDataKeys]: string;
};

export const registerNewUser = async ({
  email,
  password,
  userName,
}: RegisterDataValues) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    enqueueSnackbar("Error updating profile", { variant: "error" });
  }
};
