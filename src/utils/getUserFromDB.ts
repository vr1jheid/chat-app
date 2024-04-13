import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { UserDataDB } from "./createUserData";

type GetUserFunc = (email: string) => Promise<UserDataDB | null>;

const getUserFromDB: GetUserFunc = async (userEmail) => {
  const userDocRef = doc(db, `users/${userEmail}`);
  const userDoc = await getDoc(userDocRef);
  if (!userDoc.exists()) return null;
  const userData = userDoc.data().userData as UserDataDB;
  return userData;
};

export default getUserFromDB;
