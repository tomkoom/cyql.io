import { Project } from "@/state/types/Project"

export const getCategoryNum = (projects: Project[], categoryLabel: string): number => {
  return categoryLabel === "All" ? projects.length : projects.filter((p) => p.category.includes(categoryLabel)).length
}
