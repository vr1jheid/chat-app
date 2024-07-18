import { Timestamp as TimestampDB } from "firebase/firestore";

export interface MessageAuthor {
  email: string;
  displayName: string;
  avatarURL: string | null;
}

export interface Timestamp {
  nanoseconds: number;
  seconds: number;
}

export interface MessageDataDB {
  id: string;
  messageText: string;
  author: MessageAuthor;
  serverTime: TimestampDB;
}

export interface MessageData extends Omit<MessageDataDB, "serverTime"> {
  serverTime: number | null;
}
