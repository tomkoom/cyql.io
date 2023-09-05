export const verifyAdmin = (admins: string[], userId: string): boolean => {
  return admins.includes(userId);
};
