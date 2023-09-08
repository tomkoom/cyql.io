export const sortProjectsByDate = (dateA: string, dateB: string): number => {
  if (dateA && dateB) {
    return Number(dateB) - Number(dateA)
  } else if (dateA && !dateB) {
    return -1
  } else if (!dateA && dateB) {
    return 1
  } else return 0
}
