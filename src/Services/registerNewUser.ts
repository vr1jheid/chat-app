import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { RegisterDataKeys } from "../Components/Auth/types/authTypes";
import { auth } from "../main";
import createUserData from "../utils/createUserData";
import createUserInDB from "./createUserInDB";

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
  }
  if (auth.currentUser) {
    updateProfile(auth.currentUser, { displayName: userName });
    createUserInDB(
      createUserData({ ...auth.currentUser, displayName: userName })
    );
  }
};
