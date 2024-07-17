import { Navigate, Outlet } from "react-router-dom";

import { Loader } from "../Components/Shared/Loader";
import { selectCurrentUser } from "../Store/CurrentUser/currentUser";
import { useAppSelector } from "../Store/hooks";

export const ProtectedRoutes = () => {
  const { uid, isLoaded } = useAppSelector(selectCurrentUser);
  const isAuth = Boolean(uid);

  const render = () => {
    if (!isLoaded) {
      return (
        <div className="relative w-full h-dvh">
          <Loader color="#766ac8" size={70} />
        </div>
      );
    }

    return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
  };

  return render();
};
