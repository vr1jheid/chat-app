export interface FieldData {
  value: string;
  isValid: boolean;
  message: string;
}

export interface RegisterData {
  email: FieldData;
  password: FieldData;
  userName: FieldData;
}

export type RegisterDataKeys = keyof RegisterData;
