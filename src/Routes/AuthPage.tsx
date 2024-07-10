import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useAppSelector } from "../Store/hooks";
import { selectCurrentUser } from "../Store/CurrentUser/currentUser";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../Components/Shared/Loader";
import { useEffect } from "react";
import { Dot } from "../Components/animata/background/dot";

export const AuthPage = () => {
  const { isLoaded, uid } = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (uid) {
      navigate("/");
    }
  }, [uid]);

  const handleActionChanger = (
    _e: React.MouseEvent<HTMLElement, MouseEvent>,
    newValue: string
  ) => {
    if (!newValue) return;
    navigate(`${newValue}`);
  };

  if (isLoaded === false) {
    return (
      <div>
        <Loader color="#766ac8" size={70} />
      </div>
    );
  }

  return (
    <Dot className="bg-gray-light max-h-screen" size={4} color={"#3d3861"}>
      <div className="h-dvh flex lg:block items-center lg:pt-[8%]">
        <div className="mx-auto py-5 flex flex-col items-center justify-center bg-[#ffffff] w-screen h-fit lg:w-3/5 2xl:w-1/3  md:w-2/3 rounded-lg">
          <header className="m-auto mb-8 w-fit">
            <Typography
              variant="h2"
              textAlign="center"
              className=" text-purple-950"
            >
              Noname Chat
            </Typography>
          </header>

          <div className="flex flex-col  justify-center pt-0 items-center gap-8 w-full px-3 h-full  sm:px-10 sm:py-10 sm:pt-0 rounded-lg">
            <ToggleButtonGroup
              color="primary"
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

            <form className="flex flex-col w-full gap-7">
              <Outlet />
            </form>
          </div>
        </div>
      </div>
    </Dot>
  );
};
