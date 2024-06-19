import { FieldData } from "../types/authTypes";

export const validateEmail = (email: string): Omit<FieldData, "value"> => {
  if (!email.match(/^\w+@\w+[.]\w+$/i)) {
    return {
      isValid: false,
      message: "Invalid email",
    };
  }
  return {
    isValid: true,
    message: "",
  };
};
