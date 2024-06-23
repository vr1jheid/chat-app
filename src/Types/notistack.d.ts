import { MessageAuthor } from "./messageTypes";

export declare module "notistack" {
  interface VariantOverrides {
    messageNotification: {
      messageAuthor: MessageAuthor;
      chatID: string;
    };
  }
}
