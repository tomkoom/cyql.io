export const formatDate = (timestamp: string): string => {
  const ts = Number(timestamp)
  const date = new Date(ts)
  return date.toDateString()
}
