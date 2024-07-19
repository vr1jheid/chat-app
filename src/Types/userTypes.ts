export interface UserChatParaps {
  [key: string]: {
    isMuted: boolean;
    lastSeenMessage?: {
      id: string;
      timestampMillis: number;
    };
  };
}

export interface UserDataDB {
  uid: string;
  email: string;
  displayName: string;
  avatarURL: string | null;
  emailVerified: boolean;
  chats: UserChatParaps;
}
