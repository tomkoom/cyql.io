export const verifyAdmin = (admins: string[], userKey: string): boolean => {
  return admins.includes(userKey);
};
