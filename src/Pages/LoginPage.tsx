import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { db } from "../firebase-config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";

const LoginPage = () => {
  const func = () => {
    db;
  };

  const googleAuthenticate = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);

    const user = res.user;
    console.log(user);
  };

  return (
    <Container sx={{ pt: 1 }} maxWidth="lg">
      <Typography variant="h1" component="h2" textAlign="center">
        Login Page
      </Typography>
      <Container
        component="form"
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
          flexDirection: "column",
          gap: 5,
          width: "500px",
        }}
      >
        <TextField label="login"></TextField>
        <TextField label="Password"></TextField>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
          <Button sx={{ fontWeight: 600 }} variant="outlined">
            Log In
          </Button>
          <IconButton onClick={googleAuthenticate}>
            <GoogleIcon />
          </IconButton>
        </Box>
      </Container>
    </Container>
  );
};

export default LoginPage;
