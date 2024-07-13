import { TextField, Button } from "@mui/material";
import { PasswordInput } from "./PasswordInput";
import { useRegisterForm } from "./hooks/useRegisterForm";

export const RegisterForm = () => {
  const { registerState, onFieldChange, onSubmit } = useRegisterForm();
  const { email, userName, password } = registerState;

  return (
    <>
      <TextField
        autoComplete="off"
        required
        label="Email"
        helperText={email.message}
        error={!email.isValid}
        value={email.value}
        type="email"
        onChange={(e) => {
          onFieldChange(e, "email");
        }}
      />
      <TextField
        autoComplete="off"
        required
        label="User name"
        helperText={userName.message}
        error={!userName.isValid}
        value={userName.value}
        type="text"
        onChange={(e) => {
          onFieldChange(e, "userName");
        }}
      />

      <PasswordInput
        autoComplete="off"
        required
        label="Password *"
        error={!password.isValid}
        helperText={password.message}
        value={password.value}
        onChange={(e) => {
          onFieldChange(e, "password");
        }}
      />

      <div className=" flex justify-center">
        <Button
          className="w-20 h-10 inline-flex items-center justify-center"
          sx={{ fontWeight: 600 }}
          variant="outlined"
          type="submit"
          onClick={onSubmit}
        >
          Register
        </Button>
      </div>
    </>
  );
};
