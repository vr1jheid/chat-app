import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { enqueueSnackbar } from "notistack";

import { auth } from "../../../main";

export const googleAuthenticate = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      enqueueSnackbar(error.message, {
        variant: "error",
        preventDuplicate: true,
      });
    }
  }
};
