const getTimeFromTimestamp = (millis: number) => {
  const dateObj = new Date(millis);
  const time = `${
    dateObj.getHours() < 10 ? "0" + dateObj.getHours() : dateObj.getHours()
  }:${
    dateObj.getMinutes() < 10
      ? "0" + dateObj.getMinutes()
      : dateObj.getMinutes()
  }`;
  return time;
};

export default getTimeFromTimestamp;
