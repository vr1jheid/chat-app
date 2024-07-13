export interface FieldParams {
  value: string;
  isValid: boolean;
  message: string;
}

export interface RegisterFormData {
  email: FieldParams;
  password: FieldParams;
  userName: FieldParams;
}

export type RegisterFormDataKeys = keyof RegisterFormData;
export type FieldParamsKeys = keyof FieldParams;
