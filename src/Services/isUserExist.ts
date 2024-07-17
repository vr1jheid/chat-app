import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../main";
import { UserDataDB } from "../Types/userTypes";

export const isUserExist = async (
  param: keyof Pick<UserDataDB, "email" | "uid" | "displayName">,
  target: string
) => {
  let result = false;
  const q = query(
    collection(db, "users"),
    where(`userData.${param}`, "==", target)
  );
  const qSnapshot = await getDocs(q);
  qSnapshot.forEach((doc) => {
    if (doc.exists()) {
      result = true;
    }
  });
  return result;
};
