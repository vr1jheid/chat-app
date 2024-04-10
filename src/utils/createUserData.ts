import { User } from "firebase/auth";
import { currentUserState } from "../redux/slices/currentUser";

export interface UserDataDB {
  uid: string;
  email: string | null;
  displayName: string | null;
  avatarURL: string | null;
  emailVerified: boolean;
}

type UserDataCreator = (user: User) => UserDataDB;

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
