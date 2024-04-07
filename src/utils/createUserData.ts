import { User } from "firebase/auth";
import { currentUserState } from "../redux/slices/currentUser";

type UserDataCreator = (user: User) => Omit<currentUserState, "isLoaded">;

const createUserData: UserDataCreator = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    avatarURL: user.photoURL,
    emailVerified: user.emailVerified,
  };
};

export default createUserData;
