import { TextField, Button } from "@mui/material";
import { useCallback, useState } from "react";
import PasswordInput from "./PasswordInput";
import { RegisterDataKeys, RegisterData, FieldData } from "./types/authTypes";
import { getRegisterInitialState } from "./utils/getRegisterInitialState";
import { registerNewUser } from "../../Services/registerNewUser";
import { throttle } from "../../utils/throttle";
import { validateEmail } from "./validation/validateEmail";
import { validateUserName } from "./validation/validateUserName";
import { validatePassword } from "./validation/validatePassword";

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

  const validateUserNameThrottled = useCallback(
    throttle(validateUserName, 500),
    []
  );

  const register = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const isAllValid = Object.values(getFieldsDataByType("isValid")).every(
      (f) => f
    );
    const isAllFilled = Object.values(getFieldsDataByType("value")).every(
      (f) => f
    );
    if (!isAllValid || !isAllFilled) return;
    registerNewUser(getFieldsDataByType("value"));
  };

  return (
    <>
      <TextField
        required
        label="Email"
        helperText={registerData.email.message}
        error={!registerData.email.isValid}
        value={registerData.email.value}
        type="email"
        onChange={(e) => {
          setFieldData("email", "value", e.target.value);

          const validationResult = validateEmail(e.target.value);
          setFieldData("email", "isValid", validationResult.isValid);
          setFieldData("email", "message", validationResult.message);
        }}
      ></TextField>
      <TextField
        required
        label="User name"
        helperText={registerData.userName.message}
        error={!registerData.userName.isValid}
        value={registerData.userName.value}
        type="text"
        onChange={async (e) => {
          setFieldData("userName", "value", e.target.value);
          const validationResult = await validateUserNameThrottled(
            e.target.value
          );
          if (!validationResult) return;
          console.log(validationResult);

          setFieldData("userName", "isValid", validationResult.isValid);
          setFieldData("userName", "message", validationResult.message);
        }}
        onBlur={async (e) => {
          const validationResult = await validateUserName(e.target.value);

          setFieldData("userName", "isValid", validationResult.isValid);
          setFieldData("userName", "message", validationResult.message);
        }}
      ></TextField>

      <PasswordInput
        required
        label="Password *"
        error={!registerData.password.isValid}
        helperText={registerData.password.message}
        value={registerData.password.value}
        onChange={(e) => {
          setFieldData("password", "value", e.target.value);
          const validationResult = validatePassword(e.target.value);
          setFieldData("password", "isValid", validationResult.isValid);
          setFieldData("password", "message", validationResult.message);
        }}
      />

      <div className=" flex justify-center">
        <Button
          className="w-20 h-10 inline-flex items-center justify-center"
          sx={{ fontWeight: 600 }}
          variant="outlined"
          type="submit"
          onClick={register}
        >
          Register
        </Button>
      </div>
    </>
  );
};

export default RegisterForm;
