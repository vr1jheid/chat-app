import { createContext } from "react";
import { VariableSizeList } from "react-window";

type RefType = React.MutableRefObject<VariableSizeList<any> | null> | null;

export interface MessagesSizes {
  [key: string]: number;
}

export interface IMessagesListContext {
  listRef: RefType;
  messagesSizes: React.MutableRefObject<MessagesSizes> | null;
}

export const ChatContext = createContext<IMessagesListContext>({
  listRef: null,
  messagesSizes: null,
});
