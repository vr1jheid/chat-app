import {
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import LogInForm from "../Components/LogInForm";
import RegisterForm from "../Components/RegisterForm";
import { useAppSelector } from "../redux/hooks";
import { selectUserIsLoaded } from "../redux/slices/currentUser";

const LoginPage = () => {
  const isLoaded = useAppSelector(selectUserIsLoaded);
  const [action, setAction] = useState("login");

  const handleActionChanger = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    newValue: string
  ) => {
    if (!newValue) return;
    setAction(newValue);
  };

  if (!isLoaded) {
    return <div>Loading pls wait</div>;
  }

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
        Login Page
      </Typography>
      <ToggleButtonGroup
        size="medium"
        exclusive
        value={action}
        onChange={handleActionChanger}
      >
        <ToggleButton sx={{ width: "100px" }} value={"login"}>
          Log In
        </ToggleButton>
        <ToggleButton sx={{ width: "100px" }} value={"register"}>
          Register
        </ToggleButton>
      </ToggleButtonGroup>
      {action === "login" ? <LogInForm /> : <RegisterForm />}
    </Container>
  );
};

export default LoginPage;
