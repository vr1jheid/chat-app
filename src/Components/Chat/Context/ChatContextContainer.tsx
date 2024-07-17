import { ReactNode, useState } from "react";
import { VariableSizeList } from "react-window";

import { ChatContext } from "./ChatContext";

export const ChatContextContainer = ({ children }: { children: ReactNode }) => {
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
