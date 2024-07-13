import { createContext } from "react";
import { VariableSizeList } from "react-window";

type RefType = React.MutableRefObject<VariableSizeList<any> | null> | null;

export interface IMessagesListContext {
  listRef: RefType;
  setListRef: React.Dispatch<React.SetStateAction<RefType>>;
}

export const ChatContext = createContext<IMessagesListContext>({
  listRef: null,
  setListRef: () => {},
});
