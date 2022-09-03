const substring70 = (str) => {
  return str.length > 70 ? `${str.substring(0, 70)}…` : str;
};

const substring105 = (str) => {
  return str.length > 105 ? `${str.substring(0, 105)}…` : str;
};

const substring140 = (str) => {
  return str.length > 140 ? `${str.substring(0, 140)}…` : str;
};

export { substring70, substring105, substring140 };
