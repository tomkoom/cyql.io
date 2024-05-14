export const sortProjectsByDate = (timestampA: string, timestampB: string): number => {
  if (timestampA && timestampB) {
    return Number(timestampB) - Number(timestampA)
  } else if (timestampA && !timestampB) {
    return -1
  } else if (!timestampA && timestampB) {
    return 1
  } else return 0
}
