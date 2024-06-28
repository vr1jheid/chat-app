export interface UserChatParaps {
  [key: string]: {
    isMuted: boolean;
    lastSeenMessage?: string;
  };
}

export interface UserDataDB {
  uid: string;
  email: string;
  displayName: string | null;
  avatarURL: string | null;
  emailVerified: boolean;
  chats: UserChatParaps;
}
