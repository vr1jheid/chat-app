import { MessageAuthor } from "./messageTypes";

export interface MessageNotification {
  messageAuthor: MessageAuthor;
  chatID: string;
  type?: "standard" | "mobile";
}

export declare module "notistack" {
  interface VariantOverrides {
    messageNotification: {
      messageAuthor: MessageAuthor;
      chatID: string;
      type?: "standard" | "mobile";
    };
  }
}
