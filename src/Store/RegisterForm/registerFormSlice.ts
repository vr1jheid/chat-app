import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FieldParamsKeys,
  RegisterFormData,
  RegisterFormDataKeys,
} from "../../Components/Auth/types/authTypes";
import { createRegisterInitialState } from "./utils/createRegisterInitialState";

const registerFields: RegisterFormDataKeys[] = [
  "email",
  "userName",
  "password",
];

const initialState = createRegisterInitialState(
  registerFields
) as RegisterFormData;

export interface BooleanSetter {
  field: RegisterFormDataKeys;
  param: Extract<FieldParamsKeys, "isValid">;
  value: boolean;
}

export interface StringSetter extends Pick<BooleanSetter, "field"> {
  param: Exclude<FieldParamsKeys, "isValid">;
  value: string;
}

const registerFormSlice = createSlice({
  name: "registerForm",
  initialState,
  selectors: {
    selectRegisterFormState: (state) => state,
  },
  reducers: {
    setFieldParam: (
      state,
      { payload }: PayloadAction<StringSetter | BooleanSetter>
    ) => {
      const { field, param, value } = payload;
      if (param === "isValid" && typeof value === "boolean") {
        state[field][param] = value;
      } else {
        state[field][param] = value;
      }
    },
    clearRegisterForm: () => {
      return initialState;
    },
  },
});

export const { setFieldParam, clearRegisterForm } = registerFormSlice.actions;

export const { selectRegisterFormState } = registerFormSlice.selectors;

export default registerFormSlice.reducer;
