import { Project } from "@/state/types/Project"

export const filterBySearch = (project: Project, q: string) => {
  return q === "" ? project : project.name.toLowerCase().includes(q.toLowerCase())
}

export const sortNewest = (a: number, b: number): number => b - a
export const sortOldest = (a: number, b: number): number => a - b
export const sortMostUp = (a: number, b: number): number => b - a
export const sortLeastUp = (a: number, b: number): number => a - b
export const sortRecentlyUpdated = (a: number, b: number): number => b - a
