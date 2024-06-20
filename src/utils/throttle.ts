export const throttle = <F extends (...args: any[]) => any>(
  func: F,
  delay: number
) => {
  let isThrottle = false;
  let lastArgs: Parameters<F> | null = null;

  const wrappedFunc = (...args: Parameters<F>): ReturnType<F> | undefined => {
    if (isThrottle) {
      lastArgs = args;
      return;
    }

    const res = func(...args);
    isThrottle = true;

    setTimeout(() => {
      isThrottle = false;
      if (lastArgs) {
        wrappedFunc(...lastArgs);
        lastArgs = null;
      }
    }, delay);

    return res;
  };

  return wrappedFunc;
};
