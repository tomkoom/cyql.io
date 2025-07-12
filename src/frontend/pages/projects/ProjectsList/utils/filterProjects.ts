import { Project } from "@/state/types/curated_projects_types"

export const filterBySearch = (project: Project, q: string) => {
  return q === "" ? project : project.name.toLowerCase().includes(q.toLowerCase())
}
