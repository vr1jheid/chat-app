import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/slices/currentUser";

const ProtectedRoutes = () => {
  const { uid, isLoaded } = useAppSelector(selectCurrentUser);
  const isAuth = Boolean(uid);

  const render = () => {
    if (!isLoaded) {
      return <div>PLS WAIT LOADING</div>;
    }
    return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
  };

  return render();
};

export default ProtectedRoutes;
