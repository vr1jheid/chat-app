export interface UserDataDB {
  uid: string;
  email: string;
  displayName: string | null;
  avatarURL: string | null;
  emailVerified: boolean;
  chats: string[];
}
