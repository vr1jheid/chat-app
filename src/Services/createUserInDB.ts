import { doc, setDoc } from "firebase/firestore";
import { UserDataDB } from "../Types/userTypes";
import { db } from "../main";

type UserCreator = (user: UserDataDB) => void;

const createUserInDB: UserCreator = async (user) => {
  await setDoc(doc(db, "users", user.email ?? "заглушка заменить"), {
    userData: user,
  });
};

export default createUserInDB;
