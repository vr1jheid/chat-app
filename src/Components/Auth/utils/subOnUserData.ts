import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase-config";
import store from "../../../Store/store";
import { setUser } from "../../../Store/CurrentUser/currentUser";
import { UserDataDB } from "../../../Types/userTypes";

export const subOnUserData = (currentUserEmail: string) => {
  const userDocRef = doc(db, `users/${currentUserEmail}`);
  const unsub = onSnapshot(userDocRef, (doc) => {
    const userDocData = doc.data();
    if (!userDocData) return;

    const userData = userDocData.userData as UserDataDB;
    store.dispatch(setUser({ ...userData, isLoaded: true }));
  });
  return unsub;
};
