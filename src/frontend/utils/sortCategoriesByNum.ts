import type { Category } from "@/state/_types/types"
import type { Project } from "@/state/_types/curated_projects_types"

export const sortCategoriesByNum = (
  allCategories: Category[],
  projects: Project[]
): Category[] => {
  const projectsNum = projects.length

  const sort = (projects: Project[], a: Category, b: Category): number => {
    const aLen =
      a.id === "all"
        ? projectsNum
        : projects.filter((project) => project.category.includes(a.label)).length

    const bLen =
      b.id === "all"
        ? projectsNum
        : projects.filter((project) => project.category.includes(b.label)).length

    return bLen - aLen
  }

  return [...allCategories].sort((a, b) => sort(projects, a, b))
}
