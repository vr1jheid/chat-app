export const convertServerTimestamp = (timestamp: any) => {
  if (!timestamp) return null;
  return {
    seconds: timestamp.seconds,
    nanoseconds: timestamp.nanoseconds,
  };
};
