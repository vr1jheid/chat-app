import { getDocs, collection } from "firebase/firestore";

import { UserDataDB } from "../Components/Types/userTypes";
import { db } from "../firebase-config";

const getAllUsersEmailsFromDB = async () => {
  const querySnaphot = await getDocs(collection(db, "users"));
  const usersEmailsList: string[] = [];
  querySnaphot.forEach((doc) => {
    const resp = doc.data();
    const userData = resp.userData as UserDataDB;
    usersEmailsList.push(userData.email);
  });
  return usersEmailsList;
};

export default getAllUsersEmailsFromDB;
