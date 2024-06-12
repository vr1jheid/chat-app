import { ReactNode, createContext, useState } from "react";
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

const ChatContextContainer = ({ children }: { children: ReactNode }) => {
  const [listRef, setListRef] =
    useState<React.MutableRefObject<VariableSizeList<any> | null> | null>(null);

  return (
    <ChatContext.Provider
      value={{
        listRef,
        setListRef,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextContainer;
