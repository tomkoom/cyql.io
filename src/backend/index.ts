import { ic, query, update, StableBTreeMap, Opt, Vec, Canister, text, nat64 } from "azle"
import { ProjectId, ProjectProposal, ProjectData } from "./types"

// maps
// const projectProposals = StableBTreeMap<ProjectId, ProjectProposal>(0, 30, 25_000)
// curatedProjects2 key: 20+ bytes, val: 14902+ bytes
// const curatedProjects2 = StableBTreeMap<ProjectId, ProjectData>(1, 30, 25_000)
// const curatedProjects = StableBTreeMap(ProjectId, ProjectData, 1)
const curatedProjects2 = StableBTreeMap(ProjectId, ProjectData, 5)

export default Canister({
  insertCuratedProject: update([ProjectId, ProjectData], Opt(ProjectData), (key, value) => {
    return curatedProjects2.insert(key, value)
  }),

  removeCuratedProject: update([ProjectId], Opt(ProjectData), (key) => {
    return curatedProjects2.remove(key)
  }),

  getCuratedProject: query([ProjectId], Opt(ProjectData), (key) => {
    return curatedProjects2.get(key)
  }),

  listCuratedProjects: query([], Vec(ProjectData), () => {
    const result = curatedProjects2.values()
    const resultSliced = result.slice(0, 1)
    return resultSliced
  }),

  getCuratedProjectsNum: query([], nat64, () => {
    return curatedProjects2.len()
  }),

  whoami: query([], text, () => {
    return ic.caller().toString()
  }),
})
