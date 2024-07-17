import {
  RegisterFormData,
  RegisterFormDataKeys,
} from "../../../Components/Auth/types/authTypes";

export const createRegisterInitialState = (fields: RegisterFormDataKeys[]) => {
  return fields.reduce((acc: RegisterFormData | object, field) => {
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
