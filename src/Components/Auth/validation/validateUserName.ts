import { isUserExist } from "../../../Services/isUserExist";

export const validateUserName = async (userName: string) => {
  if (userName.length < 4) {
    return {
      isValid: false,
      message: "User name must be at least 4 characters",
    };
  }

  const isUserWithSameNameExist = await isUserExist("displayName", userName);
  if (isUserWithSameNameExist) {
    return {
      isValid: false,
      message: "User with same name already exist",
    };
  }
  return {
    isValid: true,
    message: "",
  };
};
