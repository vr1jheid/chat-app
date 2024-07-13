import {
  RegisterFormDataKeys,
  RegisterFormData,
} from "../../../Components/Auth/types/authTypes";

export const createRegisterInitialState = (fields: RegisterFormDataKeys[]) => {
  return fields.reduce((acc: RegisterFormData | {}, field) => {
    return {
      ...acc,
      [field]: {
        value: "",
        isValid: true,
        message: "",
      },
    };
  }, {});
};