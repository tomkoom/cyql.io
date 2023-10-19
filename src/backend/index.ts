import { ic, query, update, StableBTreeMap, Opt, Vec, Canister, text } from "azle"
import { ProjectId, ProjectProposal, ProjectData } from "./types"

// maps
// const projectProposals = StableBTreeMap<ProjectId, ProjectProposal>(0, 30, 25_000)
// curatedProjects key: 20+ bytes, val: 14902+ bytes
// const curatedProjects = StableBTreeMap<ProjectId, ProjectData>(1, 30, 25_000)
const curatedProjects = StableBTreeMap(ProjectId, ProjectData, 1)

export default Canister({
  addCuratedProject: update([ProjectId, ProjectData], Opt(ProjectData), (key, value) => {
    return curatedProjects.insert(key, value)
  }),

  deleteCuratedProject: update([ProjectId], Opt(ProjectData), (key) => {
    return curatedProjects.remove(key)
  }),

  listCuratedProjects: query([], Vec(ProjectData), () => {
    return curatedProjects.values()
  }),

  whoami: query([], text, () => {
    return ic.caller().toString()
  }),
})

// $query
// export function getProjectProposals(): Vec<ProjectProposal> {
//   return projectProposals.values()
// }

// $update
// export function addProjectProposal(projectData: ProjectData): Opt<ProjectProposal> {
//   const id = projectId()
//   const proposalNumber = projectProposals.len()
//   const proposer = ic.id()

//   const projectProposal = {
//     id,
//     proposalNumber,
//     proposer,
//     projectData,
//   }
//   return projectProposals.insert(id, projectProposal)
// }

// const executeProposal = () => {}
// const updateProposalState = () => {}
