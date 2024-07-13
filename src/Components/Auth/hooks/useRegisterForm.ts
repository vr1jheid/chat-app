import { isUserExist } from "../../../Services/isUserExist";
import { registerNewUser } from "../../../Services/registerNewUser";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import {
  selectRegisterFormState,
  setFieldParam,
} from "../../../Store/RegisterForm/registerFormSlice";
import { FieldParams, RegisterFormDataKeys } from "../types/authTypes";
import { validateByField } from "../validation/validateByField";

export const useRegisterForm = () => {
  const registerState = useAppSelector(selectRegisterFormState);
  const dispatch = useAppDispatch();
  const { email, userName, password } = registerState;

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const fieldsData = Object.entries(registerState) as [
      RegisterFormDataKeys,
      FieldParams
    ][];

    const allFilled = fieldsData
      .map(([field, { value }]) => {
        if (!value) {
          dispatch(setFieldParam({ field, param: "isValid", value: false }));
        }
        return Boolean(value);
      })
      .every((p) => p);

    const allValid = fieldsData.every(([_, { isValid }]) => isValid);

    if (!allFilled || !allValid) return;

    const userWithSameNameExist = await isUserExist(
      "displayName",
      userName.value
    );

    if (userWithSameNameExist) {
      dispatch(
        setFieldParam({ field: "userName", param: "isValid", value: false })
      );
      dispatch(
        setFieldParam({
          field: "userName",
          param: "message",
          value: "User with same name already exists",
        })
      );
      return;
    }

    registerNewUser({
      email: email.value,
      userName: userName.value,
      password: password.value,
    });
  };

  const onFieldChange = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: RegisterFormDataKeys
  ) => {
    const { value } = target;

    dispatch(
      setFieldParam({
        field,
        value,
        param: "value",
      })
    );

    const { isValid, message } = validateByField(field, value);
    dispatch(setFieldParam({ field, param: "isValid", value: isValid }));
    dispatch(
      setFieldParam({
        field,
        param: "message",
        value: message,
      })
    );
  };

  return { onSubmit, onFieldChange, registerState };
};
