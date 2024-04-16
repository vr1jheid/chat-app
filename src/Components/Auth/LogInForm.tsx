import { Box, Button, Container, IconButton, TextField } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { useState } from "react";
import PasswordInput from "./PasswordInput";
import createUserInDB from "../../utils/createUserInDB";
import authUser from "../../utils/authUser";

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleAuthenticate = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);

      authUser(res.user);
    } catch (error) {
      console.log("Не удалось залогиньться через гуголь(", error);
    }
  };

  const signInWithEmailAndPass = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Container
      component="form"
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: 5,
        width: "500px",
      }}
    >
      <TextField
        label="Email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      ></TextField>

      <PasswordInput
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => setPassword(e.target.value)}
        value={password}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Button
          sx={{ fontWeight: 600 }}
          variant="outlined"
          onClick={signInWithEmailAndPass}
        >
          Log In
        </Button>
        <Button
          sx={{ fontWeight: 600 }}
          variant="outlined"
          onClick={() => console.log(auth.currentUser)}
        >
          Get current User
        </Button>

        <Box>
          <IconButton onClick={googleAuthenticate}>
            <GoogleIcon />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
};

export default LogInForm;