export const camelCaseToWords = (str: string): string => {
  return str.replace(/([A-Z])/g, " $1").toLowerCase()
}
