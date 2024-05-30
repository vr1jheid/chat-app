import { Routes, Route, useNavigate } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import { activateUserObserver } from "./firebase-config";
import { useAppDispatch } from "./Store/hooks";
import {
  clearUser,
  currentUserState,
  setUser,
} from "./Store/CurrentUser/currentUser";
import ProtectedRoutes from "./Pages/ProtectedRoutes";
import { useEffect } from "react";
import Layout from "./Components/Layout";

import getUserFromDB from "./Services/getUserFromDB";
import AuthPage from "./Pages/AuthPage";
import { clearChatsState } from "./Store/Chats/chats";
import { clearSizes } from "./Store/MessagesSizes/messagesSizes";
import { clearActiveChat } from "./Store/ActiveChat/activeChat";
import { useWindowResize } from "./Hooks/useWindowResize";

function App() {
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
    /*
      Новый user берется из auth данных, а существующий из БД
    */
    const userFromDB = await getUserFromDB(userFromAuth.email);

    if (userFromDB) {
      dispatch(setUser({ ...userFromDB, isLoaded: true }));
    } else {
      dispatch(setUser(userFromAuth));
    }
    navigate("/");
  };

  useEffect(() => {
    activateUserObserver(changeUserHandler);
  }, []);

  useWindowResize();

  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
