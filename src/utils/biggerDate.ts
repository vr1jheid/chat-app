/* Timestamp в мс */

const biggerDate = (timestamp1: number, timestamp2: number) => {
  /*  if (!timestamp2) {
    console.log(timestamp2);
  }
  const date1 = new Date(timestamp1 * 1000);
  const date2 = new Date(timestamp2 * 1000);

  return Boolean(date1.getDate() - date2.getDate()); */
  const dateObj1 = new Date(timestamp1 * 1000);
  const dateObj2 = new Date(timestamp2 * 1000);
  const date1 = dateObj1.getDate();
  const date2 = dateObj2.getDate();
  if (date1 - date2) {
    return date1 > date2 ? timestamp1 : timestamp2;
  }
  return null;
};

export default biggerDate;
