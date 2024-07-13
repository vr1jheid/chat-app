import { FieldParams } from "../types/authTypes";

export const validatePassword = (
  password: string
): Omit<FieldParams, "value"> => {
  if (password.length < 6) {
    return {
      isValid: false,
      message: "Password must be at least 6 charactersd",
    };
  }
  return {
    isValid: true,
    message: "",
  };
};
