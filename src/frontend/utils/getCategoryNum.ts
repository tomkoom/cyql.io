import { Project } from "@/state/_types/curated_projects_types"

export const getCategoryNum = (projects: Project[], categoryLabel: string): number => {
  return categoryLabel === "All"
    ? projects.length
    : projects.filter((p) => p.category.includes(categoryLabel)).length
}
