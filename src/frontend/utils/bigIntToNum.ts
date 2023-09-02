export const bigIntToNum = (project) => {
  return Object.assign({}, project, {
    created_at: Number(project.created_at),
    updated_at: Number(project.updated_at),
  });
};
