/* Timestamp в с */

const getTimeFromTimestamp = (timestamp: number) => {
  const dateObj = new Date(timestamp * 1000);
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
