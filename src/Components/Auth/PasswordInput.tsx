import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";

interface Props {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  label: string;
  value: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  autoComplete?: string;
  name?: string;
}

export const PasswordInput = ({
  label,
  onChange,
  value,
  error = false,
  helperText = "",
  required = false,
  autoComplete = "on",
  name,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <FormControl error={error} variant="outlined">
      <InputLabel> {label}</InputLabel>
      <OutlinedInput
        name={name}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={onChange}
        id="outlined-adornment-password"
        type={isVisible ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              className="text-purple-main"
              aria-label="toggle password visibility"
              onClick={() => setIsVisible(!isVisible)}
              edge="end"
              color="primary"
            >
              {isVisible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      <FormHelperText> {helperText}</FormHelperText>
    </FormControl>
  );
};
