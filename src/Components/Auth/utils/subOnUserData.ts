import { doc, onSnapshot } from "firebase/firestore";
import store from "../../../Store/store";
import { setUser } from "../../../Store/CurrentUser/currentUser";
import { UserDataDB } from "../../../Types/userTypes";
import { db } from "../../../main";

export const subOnUserData = (currentUserEmail: string) => {
  console.log("subOnUserData");

  const userDocRef = doc(db, `users/${currentUserEmail}`);
  const unsub = onSnapshot(
    userDocRef,
    { includeMetadataChanges: true },
    (doc) => {
      if (doc.metadata.hasPendingWrites) {
        return;
      }
      const userDocData = doc.data();
      console.log(userDocData);

      if (!userDocData) return;

      const userData = userDocData.userData as UserDataDB;
      store.dispatch(setUser({ ...userData, isLoaded: true }));
    }
  );
  return unsub;
};
