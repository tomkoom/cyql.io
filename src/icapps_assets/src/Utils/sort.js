const sortByDateAdded = (a, b) => {
  const dateStrA = a ? a.replace(",", "") : undefined;
  const dateStrB = b ? b.replace(",", "") : undefined;
  if (dateStrA && dateStrB) {
    const partsA = dateStrA.split(" ").reverse().join("-");
    const partsB = dateStrB.split(" ").reverse().join("-");
    let dateA = new Date(partsA);
    let dateB = new Date(partsB);
    return dateB - dateA;
  } else if (dateStrA && !dateStrB) {
    return -1;
  } else if (!dateStrA && dateStrB) {
    return 1;
  } else return 0;
};

const sortByDate = (a, b) => {
  const timestampA = a;
  const timestampB = b;
  if (timestampA && timestampB) {
    return timestampB - timestampA;
  } else if (timestampA && !timestampB) {
    return -1;
  } else if (!timestampA && timestampB) {
    return 1;
  } else return 0;
};

export { sortByDateAdded, sortByDate };