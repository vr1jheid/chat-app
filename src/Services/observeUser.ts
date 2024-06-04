import { Unsubscribe, onAuthStateChanged } from "firebase/auth";
import { clearUser, setUserEmail } from "../Store/CurrentUser/currentUser";
import { auth } from "../main";
import createUserData from "../utils/createUserData";
import createUserInDB from "./createUserInDB";
import getUserFromDB from "./getUserFromDB";
import { clearActiveChat } from "../Store/ActiveChat/activeChat";
import { clearChats } from "../Store/Chats/chats";
import { fetchChats } from "../Store/Chats/thunks/fetchChats";
import { clearSizes } from "../Store/MessagesSizes/messagesSizes";
import store from "../Store/store";
import { subOnUserData } from "../Components/Auth/utils/subOnUserData";

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
    dispatch(fetchChats(validUserData.email));
    unSubOnUserData = subOnUserData(validUserData.email);
  });
};
