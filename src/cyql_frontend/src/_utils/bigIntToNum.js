const bigIntToNum = (projectDoc) => {
  return Object.assign({}, projectDoc, {
    created_at: Number(projectDoc.created_at),
    updated_at: Number(projectDoc.updated_at),
  });
};

export { bigIntToNum };
