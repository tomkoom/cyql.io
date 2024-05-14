import { ProjectV2 } from "@/state/_types/curated_projects_types"

const filterBySearch = (project: ProjectV2, searchQuery: string) => {
  return searchQuery === ""
    ? project
    : project.name.toLowerCase().includes(searchQuery.toLowerCase())
}

const filterByCategory = (project: ProjectV2, category: string) => {
  return category === "All" ? project : project.category.includes(category)
}

const filterByOpenSource = (project: ProjectV2, openSource: boolean) => {
  return openSource === null // unset
    ? project
    : openSource === true
    ? project.github
    : !project.github
}

const filterByOnChain = (project: ProjectV2, onChain: boolean) => {
  return onChain === null // unset
    ? project
    : onChain === true
    ? project.frontendCanisterId
    : !project.frontendCanisterId
}

export { filterBySearch, filterByCategory, filterByOpenSource, filterByOnChain }
