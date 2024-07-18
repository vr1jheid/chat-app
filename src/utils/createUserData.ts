import { User } from "firebase/auth";

import { UserDataDB } from "../Types/userTypes";

type UserDataCreator = (user: User) => UserDataDB;

const createUserData: UserDataCreator = (user) => {
  if (!user.email) {
    throw new Error("Auth data email error");
  }
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName ?? user.email.split("@")[0],
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
