import { doc, getDoc } from "firebase/firestore";
import { UserDataDB } from "../Types/userTypes";
import { db } from "../main";

type GetUserFunc = (email: string) => Promise<UserDataDB | null>;

const getUserFromDB: GetUserFunc = async (email) => {
  const userDocRef = doc(db, `users/${email}`);
  const userDoc = await getDoc(userDocRef);
  if (!userDoc.exists()) return null;
  const userData = userDoc.data().userData as UserDataDB;
  return userData;
};

export default getUserFromDB;
