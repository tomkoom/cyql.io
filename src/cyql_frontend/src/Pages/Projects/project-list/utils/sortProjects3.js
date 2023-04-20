const sortNewest = (a, b) => {
  if (a && b) {
    return b - a;
  } else if (a && !b) {
    return -1;
  } else if (!a && b) {
    return 1;
  } else return 0;
};

const sortOldest = (a, b) => {
  if (a && b) {
    return a - b;
  } else if (a && !b) {
    return 1;
  } else if (!a && b) {
    return -1;
  } else return 0;
};

export { sortNewest, sortOldest };
