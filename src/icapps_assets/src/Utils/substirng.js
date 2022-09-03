const substring = (str) => {
  return str.length > 70 ? `${str.substring(0, 70)}…` : str;
};

export { substring };
