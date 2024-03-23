export const trimZeroes = (str: string): string => {
  return str.replace(/^0+(\d)|(\d)0+$/gm, "$1$2")
}
