import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { UserDataDB } from "../Types/userTypes";

type UserCreator = (user: UserDataDB) => void;

const createUserInDB: UserCreator = async (user) => {
  await setDoc(doc(db, "users", user.email ?? "заглушка заменить"), {
    userData: user,
  });
};

export default createUserInDB;
