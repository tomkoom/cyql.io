const sortByDate = (a, b): number => {
  const dateA: null | number = a.data.added;
  const dateB: null | number = b.data.added;

  if (dateA && dateB) {
    return dateB - dateA;
  } else if (dateA && !dateB) {
    return -1;
  } else if (!dateA && dateB) {
    return 1;
  } else return 0;
};

export { sortByDate };
