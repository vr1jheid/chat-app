import {
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
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
    <Container
      sx={{
        pt: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
      }}
      maxWidth="xl"
    >
      <Typography variant="h2" textAlign="center">
        React Chat
      </Typography>
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
      <Outlet />
    </Container>
  );
};

export default AuthPage;
