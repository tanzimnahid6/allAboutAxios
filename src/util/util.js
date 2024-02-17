const nextId = (dataArray) => {
  const maxId = dataArray.reduce(
    (max, item) => (item.id > max ? item.id : max),
    0
  );
  return maxId + 1;
};
export { nextId };
