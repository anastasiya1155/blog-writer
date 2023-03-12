export const humanizeDate = (date) => {
  if (!date) {
    return date;
  }
  const [day, time] = date.split('T');
  return `${day} ${time.slice(0, -8)}`;
};
