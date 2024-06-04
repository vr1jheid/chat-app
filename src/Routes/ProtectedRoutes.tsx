import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../Store/hooks";
import { selectCurrentUser } from "../Store/CurrentUser/currentUser";
import Loader from "../Components/Shared/Loader";

const ProtectedRoutes = () => {
  console.log("protected routes");
  const { uid, isLoaded } = useAppSelector(selectCurrentUser);
  const isAuth = Boolean(uid);

  const render = () => {
    if (!isLoaded) {
      return (
        <div className="relative w-full h-dvh">
          <Loader color="#0c0206" size={100} />
        </div>
      );
    }

    return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
  };

  return render();
};

export default ProtectedRoutes;
