export const formatPrincipal = (principalIdStr) =>
  principalIdStr.substring(0, 5) + "..." + principalIdStr.substring(principalIdStr.length - 3);
