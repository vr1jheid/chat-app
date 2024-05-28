import { MutableRefObject, ReactNode, createContext, useState } from "react";
import { VariableSizeList } from "react-window";

type RefType = any | null;

export interface IMessagesListContext {
  listRef: RefType;
  setListRef: React.Dispatch<React.SetStateAction<RefType>>;
}

export const ChatContext = createContext<IMessagesListContext>({
  listRef: null,
  setListRef: () => {},
});

const ChatContextContainer = ({ children }: { children: ReactNode }) => {
  const [listRef, setListRef] = useState<RefType>(null);

  return (
    <ChatContext.Provider value={{ listRef, setListRef }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextContainer;
