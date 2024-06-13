import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useAppSelector } from "../Store/hooks";
import { selectCurrentUser } from "../Store/CurrentUser/currentUser";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Loader from "../Components/Shared/Loader";
import { useEffect } from "react";

const AuthPage = () => {
  const { isLoaded, uid } = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (uid) {
      navigate("/");
    }
  }, [uid]);

  if (isLoaded === false) {
    return (
      <div>
        <Loader color="black" />
      </div>
    );
  }

  const handleActionChanger = (
    _e: React.MouseEvent<HTMLElement, MouseEvent>,
    newValue: string
  ) => {
    if (!newValue) return;
    navigate(`${newValue}`);
  };

  return (
    <div className=" flex flex-col items-center justify-center">
      <header className=" w-screen m-auto mb-8 mt-8 ">
        <Typography variant="h2" textAlign="center">
          Fire Chat
        </Typography>
      </header>

      <div className="flex flex-col  justify-center pt-0 items-center gap-8 w-screen px-3 h-full 2xl:w-1/4 sm:w-2/3 md:w-1/2 sm:px-10 sm:py-10 sm:pt-0 rounded-lg">
        <ToggleButtonGroup
          size="medium"
          exclusive
          value={location.pathname.slice(1)}
          onChange={handleActionChanger}
        >
          <ToggleButton sx={{ width: "100px" }} value={"login"}>
            Log In
          </ToggleButton>
          <ToggleButton sx={{ width: "100px" }} value={"register"}>
            Register
          </ToggleButton>
        </ToggleButtonGroup>
        <div className="w-full">
          <form className=" flex flex-col w-full gap-7">
            <Outlet />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
