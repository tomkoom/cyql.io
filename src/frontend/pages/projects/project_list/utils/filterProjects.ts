import { Project } from "@/state/_types/curated_projects_types"

export const filterBySearch = (project: Project, searchQuery: string) => {
  return searchQuery === ""
    ? project
    : project.name.toLowerCase().includes(searchQuery.toLowerCase())
}

export const filterByCategory = (project: Project, category: string) => {
  return category === "All" ? project : project.category.includes(category)
}

export const filterByOpenSource = (project: Project, openSource: boolean) => {
  return openSource === null // unset
    ? project
    : openSource === true
    ? project.github
    : !project.github
}

export const filterByOnChain = (project: Project, onChain: boolean) => {
  return onChain === null // unset
    ? project
    : onChain === true
    ? project.frontendCanisterId
    : !project.frontendCanisterId
}
