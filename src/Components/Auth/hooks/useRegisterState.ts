import { useState } from "react";
import { FieldData, RegisterData, RegisterDataKeys } from "../types/authTypes";
import { getRegisterInitialState } from "../utils/getRegisterInitialState";

export const useRegisterState = (registerFields: RegisterDataKeys[]) => {
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
  ): Result => {
    return registerFields.reduce((acc, field) => {
      acc[field] = registerData[field][fieldDataType];
      return acc;
    }, {} as Result);
  };

  return {
    registerData,
    setFieldData,
    getFieldsDataByType,
  };
};
