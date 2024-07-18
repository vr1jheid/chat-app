export const isSameDate = (x: number, y: number) => {
  const dateX = new Date(x);
  const dateY = new Date(y);

  return (
    dateX.getDate() === dateY.getDate() &&
    dateX.getMonth() === dateY.getMonth() &&
    dateX.getFullYear() === dateY.getFullYear()
  );
};
