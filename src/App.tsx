import { useNavigate, Outlet } from "react-router-dom";
import { activateUserObserver as activateUserChangeObserver } from "./firebase-config";
import { useAppDispatch, useAppSelector } from "./Store/hooks";
import {
  clearUser,
  currentUserState,
  selectCurrentUserEmail,
  setUserEmail,
} from "./Store/CurrentUser/currentUser";
import { useEffect } from "react";
import getUserFromDB from "./Services/getUserFromDB";
import { clearChatsState } from "./Store/Chats/chats";
import { clearSizes } from "./Store/MessagesSizes/messagesSizes";
import { clearActiveChat } from "./Store/ActiveChat/activeChat";
import { useWindowResize } from "./Hooks/useWindowResize";
import createUserInDB from "./Services/createUserInDB";
import { subOnUserData } from "./Components/Auth/utils/subOnUserData";

function App() {
  const currentUserEmail = useAppSelector(selectCurrentUserEmail);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /* Инициализация firebase */
  const changeUserHandler = async (userFromAuth: currentUserState | null) => {
    if (!userFromAuth) {
      dispatch(clearUser());
      dispatch(clearChatsState());
      dispatch(clearSizes());
      dispatch(clearActiveChat());
      navigate("/login");
      return;
    }

    const userFromDB = await getUserFromDB(userFromAuth.email!);

    if (!userFromDB) {
      createUserInDB(userFromAuth);
    }
    dispatch(setUserEmail(userFromAuth.email!));
  };

  useEffect(() => {
    activateUserChangeObserver(changeUserHandler);
  }, []);

  useEffect(() => {
    if (!currentUserEmail) return;
    const unSub = subOnUserData(currentUserEmail);
    return () => {
      unSub();
    };
  }, [currentUserEmail]);

  useWindowResize();

  return <Outlet />;
}

export default App;
