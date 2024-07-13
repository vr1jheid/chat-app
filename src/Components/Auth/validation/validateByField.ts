import { RegisterFormDataKeys } from "../types/authTypes";
import { validateEmail } from "./validateEmail";
import { validatePassword } from "./validatePassword";
import { validateUserName } from "./validateUserName";

export const validateByField = (field: RegisterFormDataKeys, value: string) => {
  switch (field) {
    case "email":
      return validateEmail(value);
    case "userName":
      return validateUserName(value);
    case "password":
      return validatePassword(value);

    default:
      return {
        isValid: true,
        message: "",
      };
  }
};
