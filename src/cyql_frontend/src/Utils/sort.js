const sortByDate = (a, b) => {
  if (a && b) {
    return b - a;
  } else if (a && !b) {
    return -1;
  } else if (!a && b) {
    return 1;
  } else return 0;
};

export { sortByDate };
