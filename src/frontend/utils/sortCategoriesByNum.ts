import type { Category } from "@/state/_types/types"
import type { Project } from "@/state/_types/types"

export const sortCategoriesByNum = (
  allCategories: Category[],
  projects: Project[]
): Category[] => {
  // sort

  const sort = (projects: Project[], a: Category, b: Category) => {
    const projectsNum = projects.length
    const filter = (project: Project, label: string) => project.category.includes(label)

    const aLen =
      a.id === "all" ? projectsNum : projects.filter((project) => filter(project, a.label)).length

    const bLen =
      b.id === "all" ? projectsNum : projects.filter((project) => filter(project, b.label)).length
    return bLen - aLen
  }

  return [...allCategories].sort((a, b) => sort(projects, a, b))
}
