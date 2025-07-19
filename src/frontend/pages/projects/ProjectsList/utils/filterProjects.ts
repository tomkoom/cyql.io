import { Project } from "@/state/types/Project"

export const filterBySearch = (project: Project, q: string) => {
  return q === "" ? project : project.name.toLowerCase().includes(q.toLowerCase())
}
