import type { ProjectData } from "../../../../../declarations/backend/backend.did"

const filterBySearch = (project: ProjectData, searchQuery: string) => {
  return searchQuery === ""
    ? project
    : project.name.toLowerCase().includes(searchQuery.toLowerCase())
}

const filterByCategory = (project: ProjectData, category: string) => {
  return category === "All" ? project : project.category.includes(category)
}

const filterByOpenSource = (project: ProjectData, openSource: boolean) => {
  return openSource === null // unset
    ? project
    : openSource === true
    ? project.github
    : !project.github
}

const filterByOnChain = (project: ProjectData, onChain: boolean) => {
  return onChain === null // unset
    ? project
    : onChain === true
    ? project.canister
    : !project.canister
}

const filterByGrantee = (project: ProjectData, grantee: boolean) => {
  return grantee === null // unset
    ? project
    : grantee === true
    ? project.grantee
    : !project.grantee
}

export { filterBySearch, filterByCategory, filterByOpenSource, filterByOnChain, filterByGrantee }
