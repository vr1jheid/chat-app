import { Button, IconButton, TextField } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import PasswordInput from "./PasswordInput";
import { auth } from "../../main";
import { enqueueSnackbar } from "notistack";

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleAuthenticate = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        enqueueSnackbar(error.message, {
          variant: "error",
          preventDuplicate: true,
        });
      }
    }
  };

  const signInWithEmailAndPass = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        enqueueSnackbar(error.message, {
          variant: "error",
          preventDuplicate: true,
        });
      }
    }
  };

  return (
    <>
      <TextField
        label="Email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        className=" max-w-full"
      ></TextField>

      <PasswordInput
        label="Password"
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => setPassword(e.target.value)}
        value={password}
      />

      <div className="flex flex-col justify-center items-center gap-3">
        <Button
          className="w-20 h-10 inline-flex items-center justify-center"
          sx={{ fontWeight: 600 }}
          variant="outlined"
          onClick={signInWithEmailAndPass}
        >
          Log In
        </Button>
        <div className="flex flex-col mt-5 gap-2">
          <div className=" text-gray-extra-light">or you can sign in with</div>
          <ul className="flex justify-center">
            <li className="w-fit">
              <IconButton onClick={googleAuthenticate}>
                <GoogleIcon />
              </IconButton>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LogInForm;
