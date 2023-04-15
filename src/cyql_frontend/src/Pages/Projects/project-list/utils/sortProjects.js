const sortNewest = (a, b) => {
  return a && b ? b - a : !a && b ? 1 : a && !b ? -1 : 0;
};

const sortOldest = (a, b) => {
  return a && b ? a - b : !a && b ? -1 : a && !b ? 1 : 0;
};

const sortMostUp = (a, b) => {
  return a && b ? b.length - a.length : !a && b ? 1 : a && !b ? -1 : 0;
};

const sortLeastUp = (a, b) => {
  return a && b ? a.length - b.length : !a && b ? -1 : a && !b ? 1 : 0;
};

export { sortNewest, sortOldest, sortMostUp, sortLeastUp };
