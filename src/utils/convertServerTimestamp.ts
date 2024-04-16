export const convertServerTimestamp = (timestamp: any) => {
  return {
    seconds: timestamp.seconds,
    nanoseconds: timestamp.nanoseconds,
  };
};
