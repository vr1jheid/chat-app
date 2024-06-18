import { signOut } from "firebase/auth";
import { auth } from "../main";

export const logout = async () => {
  await signOut(auth);
};
