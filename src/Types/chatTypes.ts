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
}

export interface ActiveChat extends Omit<ChatData, "lastMessage"> {
  messages: MessageData[];
  isLoading: boolean;
}
