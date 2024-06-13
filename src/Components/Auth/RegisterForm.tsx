import { TextField, Button } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";

import React, { useState } from "react";
import PasswordInput from "./PasswordInput";
import { auth } from "../../main";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerNewUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TextField
        label="Email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      ></TextField>

      <PasswordInput
        value={password}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => setPassword(e.target.value)}
      />
      {/*  <TextField label="Repeat your password"></TextField> */}

      <div className=" flex justify-center">
        <Button
          className="w-20 h-10 inline-flex items-center justify-center"
          sx={{ fontWeight: 600 }}
          variant="outlined"
          onClick={registerNewUser}
        >
          Register
        </Button>
      </div>
    </>
  );
};

export default RegisterForm;
