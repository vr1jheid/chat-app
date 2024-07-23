import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useContext, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import AutoSizer from "react-virtualized-auto-sizer";
import { ListOnScrollProps, VariableSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import { useReverseScroll } from "../../../Hooks/useReverseScroll";
import { selectActiveChat } from "../../../Store/ActiveChat/activeChat";
import { clearActiveChatWithCache } from "../../../Store/ActiveChat/thunks/clearActiveChatWithCache";
import { loadNextPage } from "../../../Store/ActiveChat/thunks/loadNextPage";
import { selectCurrentUserEmail } from "../../../Store/CurrentUser/currentUser";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { Loader } from "../../Shared/Loader";
import { ChatContext } from "../Context/ChatContext";
import { getChatItemSize } from "../utils/getChatItemSize";
import { ChatItem } from "./ChatItem";

export const ChatBody = () => {
  const dispatch = useAppDispatch();
  const [showToBottomButton, setShowToBottomButton] = useState(false);

  const currentUserEmail = useAppSelector(selectCurrentUserEmail);
  const activeChat = useAppSelector(selectActiveChat);
  const { messages, isLoading, isNextPageLoading, hasNextPage } = activeChat;
  const { listRef, messagesSizes } = useContext(ChatContext);
  const { scrollOffset, innerListRef, outerListRef, listContainerRef } =
    useReverseScroll();

  const { ref: swiperRef, ...swipeHandler } = useSwipeable({
    onSwipedRight: ({ event }) => {
      event.stopPropagation();
      dispatch(clearActiveChatWithCache());
    },
  });

  const toBottom = () => {
    scrollOffset.current = 0;
    listRef?.current?.scrollTo(scrollOffset.current);
    setShowToBottomButton(false);
  };

  useEffect(() => {
    if (messages[0]?.author.email === currentUserEmail) {
      toBottom();
    }
  }, [messages]);

  const getSize = (index: number) => {
    return getChatItemSize(index, messagesSizes?.current ?? {});
  };

  const isItemLoaded = (index: number) => index < messages.length;

  const loadMoreMessages = () => {
    if (!hasNextPage) return;
    dispatch(loadNextPage());
  };

  const onScroll = (props: ListOnScrollProps) => {
    scrollOffset.current = props.scrollOffset;
    scrollOffset.current > 500
      ? setShowToBottomButton(true)
      : setShowToBottomButton(false);
  };

  return (
    <div
      {...swipeHandler}
      ref={(node) => {
        swiperRef(node);

        listContainerRef.current = node;
      }}
      className="w-full h-full pb-3 px-2 rotate-180 relative"
    >
      {isLoading && <Loader color="#766ac8" />}
      {showToBottomButton && (
        <button
          className="p-1 rotate-180 absolute z-10 left-6 top-6 rounded-full bg-gray-extra-light opacity-50 hover:opacity-100"
          onClick={toBottom}
        >
          <ArrowDownwardIcon
            className=" text-gray-dark"
            sx={{ width: 40, height: 40 }}
          />
        </button>
      )}
      {messages.length && (
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={messages.length + 1}
              loadMoreItems={loadMoreMessages}
              threshold={10}
            >
              {({ onItemsRendered, ref: loaderRef }) => (
                <VariableSizeList
                  ref={(node) => {
                    loaderRef(node);
                    if (!listRef) return;
                    listRef.current = node;
                  }}
                  innerRef={innerListRef}
                  outerRef={outerListRef}
                  height={height}
                  width={width}
                  itemData={activeChat}
                  initialScrollOffset={0}
                  onItemsRendered={onItemsRendered}
                  itemCount={
                    isNextPageLoading ? messages.length + 1 : messages.length
                  }
                  itemSize={getSize}
                  direction="rtl"
                  itemKey={(index) => messages[index]?.id || "loader"}
                  onScroll={onScroll}
                  useIsScrolling
                >
                  {ChatItem}
                </VariableSizeList>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      )}
    </div>
  );
};
