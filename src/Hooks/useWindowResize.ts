import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../Store/hooks";
import { setWindowSize } from "../Store/WindowSize/windowSize";
import { throttle } from "../utils/throttle";

export const useWindowResize = () => {
  const dispatch = useAppDispatch();
  const dispatchResize = () => {
    dispatch(
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    );
  };

  const throttledResize = useCallback(throttle(dispatchResize, 150), [
    dispatch,
  ]);

  useEffect(() => {
    window.addEventListener("resize", throttledResize);

    () => {
      window.removeEventListener("resize", throttledResize);
    };
  }, []);
};
