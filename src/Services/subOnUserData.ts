import { doc, onSnapshot } from "firebase/firestore";
import store from "../Store/store";
import { updateUserData } from "../Store/CurrentUser/currentUser";
import { UserDataDB } from "../Types/userTypes";
import { db } from "../main";
import { fetchChats } from "../Store/Chats/thunks/fetchChats";
import { dbMessageToLocal } from "../utils/dbMessageToLocal";

export const subOnUserData = (currentUserEmail: string) => {
  const dispatch = store.dispatch;

  const userDocRef = doc(db, `users/${currentUserEmail}`);
  const unsub = onSnapshot(
    userDocRef,
    { includeMetadataChanges: true },
    (doc) => {
      /*       if (doc.metadata.hasPendingWrites) {
        return;
      } */
      const userDocData = doc.data();
      if (!userDocData) return;

      const userData = userDocData.userData as UserDataDB;

      console.log(userData);

      dispatch(updateUserData(userData));

      const currentChatsCount = Object.keys(store.getState().chats).length;

      if (Object.keys(userData.chats).length !== currentChatsCount) {
        dispatch(fetchChats(Object.keys(userData.chats)));
      }
    }
  );
  return unsub;
};
