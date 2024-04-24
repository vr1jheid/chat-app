export interface MessageAuthor {
  email: string | null;
  displayName: string | null;
  avatarURL: string | null;
}

export interface Timestamp {
  nanoseconds: number;
  seconds: number;
}

export interface MessageData {
  id: string;
  messageText: string;
  author: MessageAuthor;
  serverTime: Timestamp | null;
}
