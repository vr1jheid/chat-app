import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { User } from "firebase/auth";
import createUserData from "./createUserData";

type UserCreator = (user: User) => void;

const createUserInDB: UserCreator = async (user) => {
  const q = query(collection(db, "users"), where("email", "==", user.email));
  const check = await getDocs(q);
  let alreadyExist = false;

  check.forEach(() => {
    alreadyExist = true;
    console.log("booba");
  });

  if (alreadyExist) return;
  console.log("its new user");

  const userData = createUserData(user);

  await setDoc(doc(db, "users", userData.email ?? "заглушка заменить"), {
    userData,
  });
};

export default createUserInDB;
