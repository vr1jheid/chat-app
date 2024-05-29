import { Timestamp as TimestampDB } from "firebase/firestore";

export interface MessageAuthor {
  email: string | null;
  displayName: string | null;
  avatarURL: string | null;
}

export interface Timestamp {
  nanoseconds: number;
  seconds: number;
}

export interface MessageTime {
  seconds: number | null;
  nanoseconds: number | null;
}

export interface MessageDataDB {
  id: string;
  messageText: string;
  author: MessageAuthor;
  serverTime: TimestampDB;
}

export interface MessageData extends Omit<MessageDataDB, "serverTime"> {
  serverTime: Timestamp | null;
}
