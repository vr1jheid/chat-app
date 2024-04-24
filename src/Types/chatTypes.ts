import { MessageData } from "../Components/Chat/Chat";

export enum ChatTypes {
  dialog = "dialog",
  group = "group",
}

export interface ChatDataDB {
  id: string;
  members: string[];
  lastMessage?: MessageData;
  type: ChatTypes | null;
}
