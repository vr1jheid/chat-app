import { Button, Container, IconButton, TextField } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import PasswordInput from "./PasswordInput";
import { auth } from "../../main";

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleAuthenticate = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log("Не удалось залогиньться через гуголь(", error);
    }
  };

  const signInWithEmailAndPass = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
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

      <div className="flex flex-col justify-center gap-3">
        <Button
          sx={{ fontWeight: 600 }}
          variant="outlined"
          onClick={signInWithEmailAndPass}
        >
          Log In
        </Button>
        <div className="flex justify-center">
          <IconButton onClick={googleAuthenticate}>
            <GoogleIcon />
          </IconButton>
        </div>
      </div>
    </Container>
  );
};

export default LogInForm;
