const filterBySearch = (projectDoc, searchQuery) => {
  return searchQuery === ""
    ? projectDoc
    : projectDoc.data.name.toLowerCase().includes(searchQuery.toLowerCase());
};

const filterByCategory = (projectDoc, category) => {
  return category === "All" ? projectDoc : projectDoc.data.category.includes(category);
};

const filterByOpenSource = (projectDoc, openSource) => {
  return openSource === null // unset
    ? projectDoc
    : openSource === true
    ? projectDoc.data.github
    : !projectDoc.data.github;
};

const filterByOnChain = (projectDoc, onChain) => {
  return onChain === null // unset
    ? projectDoc
    : onChain === true
    ? projectDoc.data.canister
    : !projectDoc.data.canister;
};

const filterByGrantee = (projectDoc, grantee) => {
  return grantee === null // unset
    ? projectDoc
    : grantee === true
    ? projectDoc.data.grantee
    : !projectDoc.data.grantee;
};

export { filterBySearch, filterByCategory, filterByOpenSource, filterByOnChain, filterByGrantee };
