import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";
import { activateUserObserver } from "./firebase-config";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  clearUser,
  currentUserState,
  selectUserUID,
  setUser,
} from "./redux/slices/currentUser";
import ProtectedRoutes from "./Pages/ProtectedRoutes";

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector(selectUserUID);

  /* Инициализация firebase */
  const changeUserHandler = (user: currentUserState | null) => {
    if (!user && currentUserId) {
      dispatch(clearUser());
      return;
    }
    if (!user) return;
    if (user.uid === currentUserId) return;

    dispatch(setUser(user));
    navigate("/");
  };

  activateUserObserver(changeUserHandler);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<MainPage />} />
      </Route>
    </Routes>
  );
}

export default App;
