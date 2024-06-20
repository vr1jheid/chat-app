import { useEffect, useRef } from "react";
import { VariableSizeList } from "react-window";

export const useReverseScroll = () => {
  const scrollOffset = useRef(0);
  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<VariableSizeList<any> | null>(null);
  const innerListRef = useRef<HTMLDivElement | null>(null);
  const outerListRef = useRef<HTMLDivElement | null>(null);

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
      listScrollHeight + 10
    );
    listRef.current.scrollTo(scrollOffset.current);
  };

  useEffect(() => {
    listContainerRef.current?.addEventListener("wheel", reverseScroll);
    return () => {
      scrollOffset.current = 0;
      listContainerRef.current?.removeEventListener("wheel", reverseScroll);
    };
  }, []);

  return {
    scrollOffset,
    listRef,
    innerListRef,
    outerListRef,
    listContainerRef,
  };
};
