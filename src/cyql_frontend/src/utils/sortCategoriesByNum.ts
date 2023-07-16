const sortCategoriesByNum = (allCategories, projects) => {
  const sort = (projects, a, b) => {
    const projectsNum = projects.length;
    const filter = (project, label) => project.data.categories.includes(label);

    const aLen =
      a.id === "all" ? projectsNum : projects.filter((project) => filter(project, a.label)).length;

    const bLen =
      b.id === "all" ? projectsNum : projects.filter((project) => filter(project, b.label)).length;
    return bLen - aLen;
  };

  return [...allCategories].sort((a, b) => sort(projects, a, b));
};

export { sortCategoriesByNum };
