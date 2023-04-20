const sortNewest = (a, b) => {
  // a may be number or null
  // b may be number or null

  if (a && b) {
    if (a < b) {
      return 1;
    } else if (a === b) {
      return 0; // ambiguous
    } else {
      return -1;
    }
  }

  if (a === null && b) {
    return 1;
  }

  if (a && b === null) {
    return -1;
  }

  return 0;
};

const sortOldest = (a, b) => {
  // a may be number or null
  // b may be number or null

  if (a && b) {
    if (a < b) {
      return -1;
    } else if (a === b) {
      return 0; // ambiguous
    } else {
      return 1;
    }
  }

  if (a === null && b) {
    return -1;
  }

  if (a && b === null) {
    return 1;
  }

  return 0;
};

const sortMostUp = (a, b) => {
  // a is an []
  // b is an []

  if (a && b) {
    if (a.length < b.length) {
      return 1;
    } else if (a.length === b.length) {
      return 0; // ambiguous
    } else {
      return -1;
    }
  }

  if (!a && b) {
    return 1;
  }

  if (a && !b) {
    return -1;
  }

  return 0;
};

const sortLeastUp = (a, b) => {
  // a is an []
  // b is an []

  if (a && b) {
    if (a.length < b.length) {
      return -1;
    } else if (a.length === b.length) {
      return 0; // ambiguous
    } else {
      return 1;
    }
  }

  if (!a && b) {
    return -1;
  }

  if (a && !b) {
    return 1;
  }

  return 0;
};

export { sortNewest, sortOldest, sortMostUp, sortLeastUp };
