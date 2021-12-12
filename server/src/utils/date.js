const getTommorow = () => {
  const today = new Date();
  let tommorrow = new Date(today);
  tommorrow.setDate(tommorrow.getDate() + 1);
  return tommorrow;
};
export { getTommorow };
