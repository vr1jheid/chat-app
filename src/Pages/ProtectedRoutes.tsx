import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectUserIsLoaded, selectUserUID } from "../redux/slices/currentUser";
import LoginPage from "./LoginPage";

const ProtectedRoutes = () => {
  const userid = useAppSelector(selectUserUID);
  const isAuth = Boolean(useAppSelector(selectUserUID));
  const isLoaded = useAppSelector(selectUserIsLoaded);

  const render = () => {
    if (!isLoaded) {
      return <div>PLS WAIT LOADING</div>;
    }
    return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
  };

  return render();
};

export default ProtectedRoutes;
