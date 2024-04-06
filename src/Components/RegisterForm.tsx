import { TextField, Box, Button, Container } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";

import React, { useState } from "react";
import PasswordInput from "./PasswordInput";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerNewUser = async () => {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential);
    const user = userCredential.user;
    sendEmailVerification(user);
    console.log(user);
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
        value={password}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => setPassword(e.target.value)}
      />
      {/*  <TextField label="Repeat your password"></TextField> */}
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
          onClick={registerNewUser}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterForm;
