import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

export const logout = async () => {
  await signOut(auth);
  console.log("user signed out");
};
