import { MessageData } from "../Chat/Chat";

export enum ChatTypes {
  dialog = "dialog",
  group = "group",
}

export interface ChatData {
  id: string;
  members: string[];
  lastMessage?: MessageData;
  type: ChatTypes | null;
}
