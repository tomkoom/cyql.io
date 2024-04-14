export const formatNumber = (num: number): string => {
  const options = {
    // minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
  return num.toLocaleString(undefined, options)
}
