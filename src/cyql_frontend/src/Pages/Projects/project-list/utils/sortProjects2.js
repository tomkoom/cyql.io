const sortNewest = (a, b) => {
  // a may be number or null
  // b may be number or null

  if (a && b) {
    return b - a;
  } else if (!a && b) {
    return 1;
  } else if (a && !b) {
    return -1;
  } else {
    return 0;
  }
};

const sortOldest = (a, b) => {
  // a may be number or null
  // b may be number or null

  if (a && b) {
    return a - b;
  } else if (!a && b) {
    return -1;
  } else if (a && !b) {
    return 1;
  } else {
    return 0;
  }
};

const sortMostUp = (a, b) => {
  // a is an []
  // b is an []

  if (a && b) {
    return b.length - a.length;
  } else if (!a && b) {
    return 1;
  } else if (a && !b) {
    return -1;
  } else {
    return 0;
  }
};

const sortLeastUp = (a, b) => {
  // a is an []
  // b is an []

  if (a && b) {
    return a.length - b.length;
  } else if (!a && b) {
    return -1;
  } else if (a && !b) {
    return 1;
  } else {
    return 0;
  }
};

export { sortNewest, sortOldest, sortMostUp, sortLeastUp };
