export const camelCaseToWords = (str: string): string => {
  const res = str.replace(/([A-Z])/g, " $1")
  return res.charAt(0).toUpperCase() + res.slice(1)
}
