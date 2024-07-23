import { onAuthStateChanged, Unsubscribe } from "firebase/auth";

import { createUserInDB } from "../Components/Auth/services/createUserInDB";
import { auth } from "../main";
import { clearActiveChat } from "../Store/ActiveChat/activeChat";
import { subOnChat } from "../Store/ActiveChat/thunks/subOnChat";
import { clearAllUsersList } from "../Store/AllUsersList/allUsersList";
import fetchAllUsersEmailsFromDB from "../Store/AllUsersList/thunks/fetchAllUsersFromDB";
import { clearChats } from "../Store/Chats/chats";
import { clearUser, setUserEmail } from "../Store/CurrentUser/currentUser";
import { clearRegisterForm } from "../Store/RegisterForm/registerFormSlice";
import { store } from "../Store/store";
import createUserData from "../utils/createUserData";
import getUserFromDB from "./getUserFromDB";
import { subOnUserData } from "./subOnUserData";

export const observeUser = async () => {
  const dispatch = store.dispatch;
  let unSubOnUserData: Unsubscribe | null = null;

  onAuthStateChanged(auth, async (userFromAuth) => {
    const { activeChat } = store.getState();
    if (!userFromAuth) {
      dispatch(clearUser());
      dispatch(clearChats());
      dispatch(clearActiveChat());
      activeChat && dispatch(subOnChat({ action: "unsub" }));
      dispatch(clearAllUsersList());
      unSubOnUserData && unSubOnUserData();
      localStorage.clear();
      return;
    }
    dispatch(clearRegisterForm());

    const validUserData = createUserData(userFromAuth);
    const userFromDB = await getUserFromDB(userFromAuth.email!);

    if (!userFromDB) {
      createUserInDB(validUserData);
    }
    dispatch(setUserEmail(validUserData.email));
    dispatch(fetchAllUsersEmailsFromDB());
    unSubOnUserData = subOnUserData(validUserData.email);
  });
};
