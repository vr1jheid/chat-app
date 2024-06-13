import AutoSizer from "react-virtualized-auto-sizer";
import { selectActiveChat } from "../../../Store/ActiveChat/activeChat";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { selectMessagesSizes } from "../../../Store/MessagesSizes/messagesSizes";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../ChatContextContainer";
import Loader from "../../Shared/Loader";
import { ListOnScrollProps, VariableSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { loadNextPage } from "../../../Store/ActiveChat/thunks/loadNextPage";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ListItem from "./ListItem";
import { selectCurrentUserEmail } from "../../../Store/CurrentUser/currentUser";
import { useReverseScroll } from "../../../Hooks/useReverseScroll";

export const ChatBody = () => {
  const [showToBottomButton, setShowToBottomButton] = useState(false);
  const currentUserEmail = useAppSelector(selectCurrentUserEmail);
  const { messages, isLoading, isNextPageLoading, hasNextPage } =
    useAppSelector(selectActiveChat);
  const sizes = useAppSelector(selectMessagesSizes);

  const dispatch = useAppDispatch();
  const { setListRef } = useContext(ChatContext);
  const {
    scrollOffset,
    listRef,
    innerListRef,
    outerListRef,
    listContainerRef,
  } = useReverseScroll();

  useEffect(() => {
    setListRef(listRef);
  }, []);

  useEffect(() => {
    if (messages[0]?.author.email === currentUserEmail) {
      toBottom();
    }
  }, [messages[0]]);

  const toBottom = () => {
    scrollOffset.current = 0;
    listRef.current?.scrollTo(scrollOffset.current);
    setShowToBottomButton(false);
  };

  const getSize = (index: number) => sizes[messages[index]?.id] + 10 || 50;
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
      ref={listContainerRef}
      className="w-full h-full pb-3 px-2 rotate-180 relative"
    >
      {isLoading && <Loader color="white" />}
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
                  onScroll={onScroll}
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
