import { doc, onSnapshot } from "firebase/firestore";

import { db } from "../main";
import { fetchChats } from "../Store/Chats/thunks/fetchChats";
import { updateUserData } from "../Store/CurrentUser/currentUser";
import { store } from "../Store/store";
import { UserDataDB } from "../Types/userTypes";

export const subOnUserData = (currentUserEmail: string) => {
  const dispatch = store.dispatch;

  const userDocRef = doc(db, `users/${currentUserEmail}`);
  const unsub = onSnapshot(
    userDocRef,
    { includeMetadataChanges: true },
    (doc) => {
      const userDocData = doc.data();
      if (!userDocData) return;

      const userData = userDocData.userData as UserDataDB;
      dispatch(updateUserData(userData));

      if (doc.metadata.hasPendingWrites) return;
      const currentChatsCount = Object.keys(store.getState().chats).length;
      if (Object.keys(userData.chats).length !== currentChatsCount) {
        dispatch(fetchChats(Object.keys(userData.chats)));
      }
    }
  );
  return unsub;
};
