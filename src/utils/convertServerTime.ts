export const convertServerTime = (serverTime: any) => {
  if (
    !serverTime ||
    !serverTime.seconds === undefined ||
    serverTime.nanoseconds === undefined
  )
    return null;
  const seconds: number = serverTime.seconds;
  const nanoseconds: number = serverTime.nanoseconds;
  return {
    seconds,
    nanoseconds,
  };
};
