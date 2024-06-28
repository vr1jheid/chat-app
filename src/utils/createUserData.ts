import { User } from "firebase/auth";
import { UserDataDB } from "../Types/userTypes";

type UserDataCreator = (user: User) => UserDataDB;

const createUserData: UserDataCreator = (user) => {
  return {
    uid: user.uid,
    email: user.email!,
    displayName: user.displayName,
    avatarURL: user.photoURL,
    emailVerified: user.emailVerified,
    chats: {
      mainChat: {
        isMuted: true,
      },
    },
  };
};

export default createUserData;
