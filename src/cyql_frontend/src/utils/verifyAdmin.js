const verifyAdmin = (admins, userKey) => {
  return admins.includes(userKey);
};

export { verifyAdmin };
