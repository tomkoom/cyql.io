import type { Category } from "@/state/_types/types"
import type { ProjectData } from "../../backend/types"

export const sortCategoriesByNum = (
  allCategories: Category[],
  projects: ProjectData[]
): Category[] => {
  // sort

  const sort = (projects: ProjectData[], a: Category, b: Category) => {
    const projectsNum = projects.length
    const filter = (project: ProjectData, label: string) => project.category.includes(label)

    const aLen =
      a.id === "all" ? projectsNum : projects.filter((project) => filter(project, a.label)).length

    const bLen =
      b.id === "all" ? projectsNum : projects.filter((project) => filter(project, b.label)).length
    return bLen - aLen
  }

  return [...allCategories].sort((a, b) => sort(projects, a, b))
}
