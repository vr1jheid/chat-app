import AutoSizer from "react-virtualized-auto-sizer";
import {
  selectActiveChat,
  selectActiveChatHasNextPage,
  selectActiveChatLoading,
  selectActiveChatNextPageLoading,
} from "../../../Store/ActiveChat/activeChat";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { selectMessagesSizes } from "../../../Store/MessagesSizes/messagesSizes";
import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../ChatContextContainer";
import Loader from "../../Shared/Loader";
import { VariableSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { loadNextPage } from "../../../Store/ActiveChat/thunks/loadNextPage";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ListItem from "./ListItem";
import { selectCurrentUserEmail } from "../../../Store/CurrentUser/currentUser";

export const ChatBody = () => {
  const [showToBottomButton, setShowToBottomButton] = useState(false);
  const currentUserEmail = useAppSelector(selectCurrentUserEmail);
  const isLoading = useAppSelector(selectActiveChatLoading);
  const isNextPageLoading = useAppSelector(selectActiveChatNextPageLoading);
  const hasNextPage = useAppSelector(selectActiveChatHasNextPage);
  const dispatch = useAppDispatch();

  const scrollOffset = useRef(0);

  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<VariableSizeList<any> | null>(null);
  const innerListRef = useRef<HTMLDivElement | null>(null);
  const outerListRef = useRef<HTMLDivElement | null>(null);

  const sizes = useAppSelector(selectMessagesSizes);
  const { messages } = useAppSelector(selectActiveChat);
  const { setListRef } = useContext(ChatContext);

  const reverseScroll = (e: WheelEvent) => {
    e.preventDefault();
    const deltaY = e.deltaY;
    if (
      !outerListRef.current?.style.height ||
      !innerListRef.current ||
      !listRef.current
    ) {
      return;
    }

    const listHeight = Number.parseInt(outerListRef.current?.style.height);
    const listScrollHeight =
      Number.parseInt(innerListRef.current.style.height) - listHeight;

    scrollOffset.current -= deltaY / 2;
    scrollOffset.current = Math.min(
      Math.max(0, scrollOffset.current),
      listScrollHeight
    );
    console.log(scrollOffset.current);
    listRef.current.scrollTo(scrollOffset.current);

    scrollOffset.current > 500
      ? setShowToBottomButton(true)
      : setShowToBottomButton(false);
  };

  const toBottom = () => {
    scrollOffset.current = 0;
    listRef.current?.scrollTo(scrollOffset.current);
    setShowToBottomButton(false);
  };

  useEffect(() => {
    if (messages[0]?.author.email === currentUserEmail) {
      toBottom();
    }
  }, [messages[0]]);

  useEffect(() => {
    setListRef(listRef);

    listContainerRef.current?.addEventListener("wheel", reverseScroll);
    return () => {
      scrollOffset.current = 0;
      listContainerRef.current?.removeEventListener("wheel", reverseScroll);
    };
  }, []);

  const getSize = (index: number) => sizes[messages[index]?.id] + 10 || 50;

  const isItemLoaded = (index: number) => index < messages.length;

  const loadMoreMessages = () => {
    if (!hasNextPage) return;
    console.log("Loading items");
    dispatch(loadNextPage());
  };

  return (
    <div
      ref={listContainerRef}
      className="w-full h-full pb-3 px-2 rotate-180 relative"
    >
      {isLoading && <Loader color="white" />}
      {showToBottomButton && (
        <button
          className="p-2 rotate-180 absolute z-10 left-6 top-6 rounded-full bg-gray-extra-light opacity-50 hover:opacity-100"
          onClick={toBottom}
        >
          <ArrowDownwardIcon
            className=" text-gray-dark"
            sx={{ width: 40, height: 40 }}
          />
        </button>
      )}
      {
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
                    listRef.current = node;
                  }}
                  innerRef={innerListRef}
                  outerRef={outerListRef}
                  height={height}
                  width={width}
                  initialScrollOffset={scrollOffset.current}
                  onItemsRendered={onItemsRendered}
                  itemCount={
                    isNextPageLoading ? messages.length + 1 : messages.length
                  }
                  itemSize={getSize}
                  direction="rtl"
                  itemKey={(index) => messages[index]?.id || "loader"}
                  onScroll={({ scrollOffset: thisScrollOffset }) => {
                    scrollOffset.current = thisScrollOffset;
                  }}
                >
                  {ListItem}
                </VariableSizeList>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      }
    </div>
  );
};
