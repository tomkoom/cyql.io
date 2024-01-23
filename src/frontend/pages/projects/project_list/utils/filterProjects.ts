import type { Project } from "@/state/_types/types"

const filterBySearch = (project: Project, searchQuery: string) => {
  return searchQuery === ""
    ? project
    : project.name.toLowerCase().includes(searchQuery.toLowerCase())
}

const filterByCategory = (project: Project, category: string) => {
  return category === "All" ? project : project.category.includes(category)
}

const filterByOpenSource = (project: Project, openSource: boolean) => {
  return openSource === null // unset
    ? project
    : openSource === true
    ? project.github
    : !project.github
}

const filterByOnChain = (project: Project, onChain: boolean) => {
  return onChain === null // unset
    ? project
    : onChain === true
    ? project.canister
    : !project.canister
}

const filterByGrantee = (project: Project, grantee: boolean) => {
  return grantee === null // unset
    ? project
    : grantee === true
    ? project.grantee
    : !project.grantee
}

export { filterBySearch, filterByCategory, filterByOpenSource, filterByOnChain, filterByGrantee }
