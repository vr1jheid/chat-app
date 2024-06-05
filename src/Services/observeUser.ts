import store from "../Store/store";
import { Unsubscribe, onAuthStateChanged } from "firebase/auth";
import { clearUser, setUserEmail } from "../Store/CurrentUser/currentUser";
import { auth } from "../main";
import createUserData from "../utils/createUserData";
import createUserInDB from "./createUserInDB";
import getUserFromDB from "./getUserFromDB";
import { clearActiveChat } from "../Store/ActiveChat/activeChat";
import { clearChats } from "../Store/Chats/chats";
import { clearSizes } from "../Store/MessagesSizes/messagesSizes";
import { subOnUserData } from "../Components/Auth/utils/subOnUserData";
import fetchAllUsersEmailsFromDB from "../Store/AllUsersList/thunks/fetchAllUsersFromDB";

export const observeUser = async () => {
  const dispatch = store.dispatch;

  let unSubOnUserData: Unsubscribe | null = null;
  onAuthStateChanged(auth, async (userFromAuth) => {
    if (!userFromAuth) {
      dispatch(clearUser());
      dispatch(clearChats());
      dispatch(clearSizes());
      dispatch(clearActiveChat());
      unSubOnUserData && unSubOnUserData();
      return;
    }

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
