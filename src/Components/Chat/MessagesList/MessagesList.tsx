import AutoSizer from "react-virtualized-auto-sizer";
import MessageContainer from "../MessageContainer";
import { VariableSizeList } from "react-window";
import { selectActiveChat } from "../../../Store/ActiveChat/activeChat";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { selectMessagesSizes } from "../../../Store/MessagesSizes/messagesSizes";
import { useContext, useEffect, useRef } from "react";
import { useSubChat } from "../../../Hooks/useSubChat";
import { ChatContext } from "../ChatContextContainer";

const MessagesList = () => {
  const { id: activeChatID } = useAppSelector(selectActiveChat);

  const listRef = useRef<VariableSizeList<any> | null>(null);
  const sizes = useAppSelector(selectMessagesSizes);
  const { messages } = useAppSelector(selectActiveChat);

  useSubChat([activeChatID]);

  const { setListRef } = useContext(ChatContext);
  useEffect(() => {
    setListRef(listRef);
  }, []);

  useEffect(() => {
    listRef?.current?.scrollToItem(messages.length);
  }, [messages.length]);

  const getSize = (index: number) => sizes[index] + 20 || 50;
  return (
    <div className="w-full h-full">
      <AutoSizer>
        {({ height, width }) => (
          <VariableSizeList
            height={height}
            width={width}
            itemCount={messages.length}
            itemSize={getSize}
            ref={listRef}
          >
            {MessageContainer}
          </VariableSizeList>
        )}
      </AutoSizer>
    </div>
  );
};

export default MessagesList;
