import { useEffect } from "react";
import { useAppDispatch } from "../Store/hooks";
import { setScreenSize } from "../Store/ScreenSize/screenSize";

const throttle = (func: any, delay: number) => {
  let isThrottle = false;

  return () => {
    if (!isThrottle) {
      func();
      isThrottle = true;
      setTimeout(() => {
        isThrottle = false;
        func();
      }, delay);
    }
  };
};

export const useWindowResize = () => {
  const dispatch = useAppDispatch();
  const dispatchResize = () => {
    console.log({ width: window.innerWidth, height: window.innerHeight });

    dispatch(
      setScreenSize({ width: window.innerWidth, height: window.innerHeight })
    );
  };

  const throttledResize = throttle(dispatchResize, 150);

  useEffect(() => {
    window.addEventListener("resize", throttledResize);

    () => {
      window.removeEventListener("resize", throttledResize);
    };
  }, []);
};
