import { ic, $query, $update, StableBTreeMap, Opt, Vec } from "azle"

// utils
import { projectId } from "../frontend/utils/projectId"

// types
import type { ProjectId, ProjectProposal, ProjectData, Doc, Test } from "./types"

// maps
const projectProposals = new StableBTreeMap<ProjectId, ProjectProposal>(0, 30, 25_000)
// curatedProjects key: 20+ bytes, val: 14902+ bytes
const curatedProjects = new StableBTreeMap<ProjectId, ProjectData>(1, 30, 25_000)
const test = new StableBTreeMap<string, Test>(2, 50, 1_000)

$query
export function getProjectProposals(): Vec<ProjectProposal> {
  return projectProposals.values()
}

$update
export function addProjectProposal(projectData: ProjectData): Opt<ProjectProposal> {
  const id = projectId()
  const proposalNumber = projectProposals.len()
  const proposer = ic.id()

  const projectProposal = {
    id,
    proposalNumber,
    proposer,
    projectData,
  }
  return projectProposals.insert(id, projectProposal)
}

$update
export function addTestItem(item: Test): Opt<Test> {
  const id = test.len().toString()
  return test.insert(id, item)
}

$query
export function listTestItems(): Vec<Test> {
  return test.values()
}

$query
export function whoami(): string {
  return ic.caller().toString()
}

const executeProposal = () => {}
const updateProposalState = () => {}

// curated projects

$update
export function addCuratedProject(projectData: ProjectData): Opt<ProjectData> {
  const id = projectData.id
  return curatedProjects.insert(id, projectData)
}

$update
export function deleteCuratedProject(id: ProjectId): Opt<ProjectData> {
  return curatedProjects.remove(id)
}

$query
export function listCuratedProjects(): Vec<ProjectData> {
  return curatedProjects.values()
}
