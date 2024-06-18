import { TextField, Button } from "@mui/material";
import { useState } from "react";
import PasswordInput from "./PasswordInput";
import { RegisterDataKeys, RegisterData, FieldData } from "./types/authTypes";
import { getRegisterInitialState } from "./utils/getRegisterInitialState";
import { registerNewUser } from "../../Services/registerNewUser";

const RegisterForm = () => {
  const registerFields: RegisterDataKeys[] = ["email", "userName", "password"];

  const [registerData, setRegisterData] = useState(
    getRegisterInitialState(registerFields) as RegisterData
  );

  const setFieldData = <FieldDataType extends keyof FieldData>(
    fieldName: RegisterDataKeys,
    fieldDataType: FieldDataType,
    newValue: FieldData[FieldDataType]
  ) => {
    setRegisterData((prev) => {
      const registerDataCopy = { ...prev };
      const fieldCopy = (registerDataCopy[fieldName] = {
        ...registerDataCopy[fieldName],
      });

      fieldCopy[fieldDataType] = newValue;
      registerDataCopy[fieldName] = fieldCopy;
      return registerDataCopy;
    });
  };

  const getFieldsDataByType = <
    FieldDataType extends keyof FieldData,
    Result extends { [K in RegisterDataKeys]: FieldData[FieldDataType] }
  >(
    fieldDataType: FieldDataType
  ) => {
    return registerFields.reduce((acc, field) => {
      acc[field] = registerData[field][fieldDataType];
      return acc;
    }, {} as Result);
  };
  const validateEmail = (email: string) => {
    if (!email.includes("@")) {
    }
  };

  const register = () => {
    if (!true) return;
    registerNewUser(getFieldsDataByType("value"));
  };

  return (
    <>
      <TextField
        label="Email"
        helperText={registerData.email.message}
        error={!registerData.email.isValid}
        value={registerData.email.value}
        type="email"
        onChange={(e) => {
          setFieldData("email", "value", e.target.value);
        }}
      ></TextField>
      <TextField
        label="User name"
        helperText={registerData.userName.message}
        error={!registerData.userName.isValid}
        value={registerData.userName.value}
        type="text"
        onChange={(e) => {
          setFieldData("userName", "value", e.target.value);
        }}
      ></TextField>

      <PasswordInput
        error={!registerData.password.isValid}
        helperText={registerData.password.message}
        value={registerData.password.value}
        onChange={(e) => {
          setFieldData("password", "value", e.target.value);
        }}
      />

      <div className=" flex justify-center">
        <Button
          className="w-20 h-10 inline-flex items-center justify-center"
          sx={{ fontWeight: 600 }}
          variant="outlined"
          onClick={register}
        >
          Register
        </Button>
      </div>
    </>
  );
};

export default RegisterForm;
