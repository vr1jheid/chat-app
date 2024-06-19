import { isUserExist } from "../../../Services/isUserExist";

export const validateUserName = async (userName: string) => {
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
