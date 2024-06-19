import { FieldData } from "../types/authTypes";

export const validatePassword = (
  password: string
): Omit<FieldData, "value"> => {
  if (password.length < 6) {
    return {
      isValid: false,
      message: "Password must be at least 6 char ",
    };
  }
  return {
    isValid: true,
    message: "",
  };
};
