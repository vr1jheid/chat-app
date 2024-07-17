import { doc, setDoc } from "firebase/firestore";

import { db } from "../main";
import { UserDataDB } from "../Types/userTypes";

type UserCreator = (user: UserDataDB) => void;

const createUserInDB: UserCreator = async (user) => {
  await setDoc(doc(db, "users", user.email), {
    userData: user,
  });
};

export default createUserInDB;
