import { RegisterDataKeys, RegisterData } from "../types/authTypes";

export const getRegisterInitialState = (fields: RegisterDataKeys[]) => {
  return fields.reduce((acc: RegisterData | {}, field) => {
    const temp = { ...acc };
    temp[field] = {
      value: "",
      isValid: true,
      message: "",
    };
    return temp;
  }, {});
};
