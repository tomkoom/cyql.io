import type { CategoryWithSize } from "@/state/types/Project"

const compareSize = (a: CategoryWithSize, b: CategoryWithSize): number => {
  if (a.size < b.size) return 1
  if (a.size > b.size) return -1
  return 0
}

export const sortCategoriesByNum = (categories: CategoryWithSize[]): CategoryWithSize[] => {
  const copy = categories.slice()
  copy.sort(compareSize)
  return copy
}
