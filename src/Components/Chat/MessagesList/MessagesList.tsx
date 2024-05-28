import AutoSizer from "react-virtualized-auto-sizer";
import {
  selectActiveChat,
  selectActiveChatLoading,
} from "../../../Store/ActiveChat/activeChat";
import { useAppSelector } from "../../../Store/hooks";
import { selectMessagesSizes } from "../../../Store/MessagesSizes/messagesSizes";
import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../ChatContextContainer";
import MessageContainer from "./MessageContainer";

import Loader from "../../Shared/Loader";
import { VariableSizeList } from "react-window";

const MessagesList = () => {
  const isLoading = useAppSelector(selectActiveChatLoading);

  const scrollOffset = useRef(0);
  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef(null);
  const innerListRef = useRef<HTMLDivElement | null>(null);
  const outerListRef = useRef<HTMLDivElement | null>(null);

  const sizes = useAppSelector(selectMessagesSizes);
  const { messages } = useAppSelector(selectActiveChat);
  const { setListRef } = useContext(ChatContext);

  const reverseScroll = (e: WheelEvent) => {
    e.preventDefault();
    const deltaY = e.deltaY;

    const listHeight = Number.parseInt(outerListRef.current?.style.height!);
    const listScrollHeight =
      Number.parseInt(innerListRef.current.style.height) - listHeight;

    scrollOffset.current -= deltaY / 5;
    scrollOffset.current = Math.min(
      Math.max(0, scrollOffset.current),
      listScrollHeight
    );

    listRef.current.scrollTo(scrollOffset.current);
  };

  useEffect(() => {
    console.log(scrollOffset.current);

    setListRef(listRef);
    listContainerRef.current?.addEventListener("wheel", reverseScroll);
    return () => {
      scrollOffset.current = 0;
      listContainerRef.current?.removeEventListener("wheel", reverseScroll);
    };
  }, []);

  const getSize = (index: number) => sizes[index] + 10 || 50;
  return (
    <div ref={listContainerRef} className="w-full h-full pb-3 rotate-180">
      {isLoading && <Loader color="white" />}
      {
        <AutoSizer>
          {({ height, width }) => (
            <VariableSizeList
              ref={listRef}
              innerRef={innerListRef}
              outerRef={outerListRef}
              height={height}
              width={width}
              initialScrollOffset={scrollOffset.current}
              itemCount={messages.length}
              itemSize={getSize}
              direction="rtl"
            >
              {MessageContainer}
            </VariableSizeList>
          )}
        </AutoSizer>
      }
    </div>
  );
};

export default MessagesList;
