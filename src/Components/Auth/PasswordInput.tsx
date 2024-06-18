import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";

interface Props {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: string;
  error?: boolean;
  helperText?: string;
}

const PasswordInput = ({
  onChange,
  value,
  error = false,
  helperText = "",
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <FormControl error={error} variant="outlined">
      <InputLabel> Password</InputLabel>
      <OutlinedInput
        value={value}
        onChange={onChange}
        id="outlined-adornment-password"
        type={isVisible ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setIsVisible(!isVisible)}
              edge="end"
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

export default PasswordInput;
