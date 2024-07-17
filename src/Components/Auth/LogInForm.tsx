import GoogleIcon from "@mui/icons-material/Google";
import { Button, IconButton, TextField } from "@mui/material";
import { useState } from "react";

import { PasswordInput } from "./PasswordInput";
import { emailPassAuthenticate } from "./services/emailPassAuthenticate";
import { googleAuthenticate } from "./services/googleAuthenticate";

export const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <TextField
        label="Email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        className=" max-w-full"
        autoComplete="email"
        name="email"
      />

      <PasswordInput
        label="Password"
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => setPassword(e.target.value)}
        value={password}
        name="current-password"
        autoComplete="current-password"
      />

      <div className="flex flex-col justify-center items-center gap-3">
        <Button
          className="w-20 h-10 inline-flex items-center justify-center"
          sx={{ fontWeight: 600 }}
          variant="outlined"
          onClick={() => {
            emailPassAuthenticate({ email, password });
          }}
        >
          Log In
        </Button>
        <div className="flex flex-col mt-5 gap-2">
          <div className=" text-gray-extra-light">or you can sign in with</div>
          <ul className="flex justify-center">
            <li className="w-fit">
              <IconButton onClick={googleAuthenticate}>
                <GoogleIcon fontSize="large" />
              </IconButton>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
