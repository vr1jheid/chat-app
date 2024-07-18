import { MessageAuthor } from "./messageTypes";

export interface IMessageNotification {
  messageAuthor: string;
  avatarURL?: string | null;
  onClose?: () => void;
  mobile?: boolean;
}

export declare module "notistack" {
  interface VariantOverrides {
    messageNotification: {
      messageAuthor: string;
      avatarURL?: string | null;
      onClose?: () => void;
      mobile?: boolean;
    };
  }
}
