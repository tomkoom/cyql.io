const sortCategoriesByNum = (allCategories, projectsDocs) => {
  const sort = (projectsDocs, a, b) => {
    const projectsDocsNum = projectsDocs.length;
    const filter = (projectDoc, label) => projectDoc.data.categories.includes(label);

    const aLen =
      a.id === "all"
        ? projectsDocsNum
        : projectsDocs.filter((projectDoc) => filter(projectDoc, a.label)).length;

    const bLen =
      b.id === "all"
        ? projectsDocsNum
        : projectsDocs.filter((projectDoc) => filter(projectDoc, b.label)).length;
    return bLen - aLen;
  };

  return [...allCategories].sort((a, b) => sort(projectsDocs, a, b));
};

export { sortCategoriesByNum };
