import { Routes, Route, useNavigate } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import { activateUserObserver } from "./firebase-config";
import { useAppDispatch } from "./Store/hooks";
import {
  clearUser,
  currentUserState,
  setUser,
} from "./Store/slices/currentUser";
import ProtectedRoutes from "./Pages/ProtectedRoutes";
import { useEffect } from "react";
import Layout from "./Components/Layout";

import getUserFromDB from "./Services/getUserFromDB";
import AuthPage from "./Pages/AuthPage";
import { clearChatsState } from "./Store/slices/chats";

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /* Инициализация firebase */
  const changeUserHandler = async (userFromAuth: currentUserState | null) => {
    if (!userFromAuth) {
      dispatch(clearUser());
      dispatch(clearChatsState());
      navigate("/login");
      return;
    }
    /*
      Новый user берется из auth данных, а существующий из БД
    */
    const userFromDB = await getUserFromDB(userFromAuth.email);

    /*     const userRefDB = doc(db, `users/${userFromAuth.email}`);
    const docSnap = await getDoc(userRefDB); */

    if (userFromDB) {
      dispatch(setUser({ ...userFromDB, isLoaded: true }));
    } else {
      dispatch(setUser(userFromAuth));
    }
    /*     if (docSnap.exists()) {
      const userFromDB = docSnap.data().userData as UserDataDB;
      dispatch(setUser({ ...userFromDB, isLoaded: true }));
    } else {
      dispatch(setUser(userFromAuth));
    } */
    navigate("/");
  };

  useEffect(() => {
    activateUserObserver(changeUserHandler);
  }, []);

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
