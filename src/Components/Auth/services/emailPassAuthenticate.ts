import { signInWithEmailAndPassword } from "firebase/auth";
import { enqueueSnackbar } from "notistack";

import { auth } from "../../../main";

interface Props {
  email: string;
  password: string;
}

export const emailPassAuthenticate = async ({ email, password }: Props) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      enqueueSnackbar(error.message, {
        variant: "error",
        preventDuplicate: true,
      });
    }
  }
};
