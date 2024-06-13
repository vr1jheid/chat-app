import { MessageData, MessageDataDB } from "./messageTypes";

export enum ChatTypes {
  dialog = "dialog",
  group = "group",
}

export interface ChatDataDB {
  id: string;
  members: string[];
  lastMessage?: MessageDataDB;
  type: ChatTypes | null;
}

export interface ChatData extends Omit<ChatDataDB, "lastMessage"> {
  lastMessage?: MessageData;
  cachedMessages: MessageData[];
  hasNextPage: boolean;
}

export interface ActiveChat
  extends Omit<ChatData, "lastMessage" | "cachedMessages"> {
  messages: MessageData[];
  isLoading: boolean;
  isNextPageLoading: boolean;
}
