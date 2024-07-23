import { ReactNode, useRef } from "react";

import { ChatContext, MessagesSizes } from "./ChatContext";

export const ChatContextContainer = ({ children }: { children: ReactNode }) => {
  const listRef = useRef(null);
  const messagesSizes = useRef<MessagesSizes>({});
  return (
    <ChatContext.Provider
      value={{
        listRef,
        messagesSizes,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
