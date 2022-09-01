const getHoldersNum = (registry) => {
  const res = [];
  registry.forEach((el) => res.push(el[1]));
  const uniq = [...new Set(res)];
  return uniq.length;
};

export { getHoldersNum };
