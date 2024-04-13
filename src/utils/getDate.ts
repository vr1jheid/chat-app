/* Timestamp в с */

const getDate = (timestamp: number) => {
  const dateObj = new Date(timestamp * 1000);
  const date =
    dateObj.getDate() < 10 ? "0" + dateObj.getDate() : dateObj.getDate();
  const month =
    dateObj.getMonth() + 1 < 10
      ? "0" + (dateObj.getMonth() + 1)
      : dateObj.getMonth() + 1;

  return `${date}.${month}`;
};

export default getDate;
