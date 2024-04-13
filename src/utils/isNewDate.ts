/* Timestamp в мс */

const isNewDate = (timestamp1: number, timestamp2: number) => {
  if (!timestamp2) {
    console.log(timestamp2);
  }
  const date1 = new Date(timestamp1 * 1000);
  const date2 = new Date(timestamp2 * 1000);

  return Boolean(date1.getDate() - date2.getDate());
};

export default isNewDate;
