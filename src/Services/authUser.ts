import { User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import createUserInDB from "./createUserInDB";

const authUser = async (authUser: User) => {
  let alreadyExist = false;
  /*   let userFromDB = {}; */

  const q = query(
    collection(db, "users"),
    where("userData.email", "==", authUser.email)
  );
  const check = await getDocs(q);
  check.forEach((doc) => {
    alreadyExist = true;
    /*    userFromDB = doc.data(); */
  });
  if (alreadyExist) return;
  createUserInDB(authUser);
};

export default authUser;
