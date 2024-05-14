import { ProjectV2 } from "@/state/_types/curated_projects_types"

export const getCategoryNum = (projects: ProjectV2[], categoryLabel: string): number => {
  return categoryLabel === "All"
    ? projects.length
    : projects.filter((p) => p.category.includes(categoryLabel)).length
}
