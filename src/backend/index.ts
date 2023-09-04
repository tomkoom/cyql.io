import {
  ic,
  $query,
  $update,
  StableBTreeMap,
  Opt,
  Vec,
  Principal,
  Service,
  serviceUpdate,
  serviceQuery,
  CallResult,
  Result,
  nat64,
  nat,
} from "azle"

// utils
import { projectId } from "../frontend/utils/projectId"

// types
import type { ProjectId, ProjectProposal, ProjectData, Doc } from "./types"

// maps
const projectProposals = new StableBTreeMap<ProjectId, ProjectProposal>(0, 50, 1_000)
const projects = new StableBTreeMap<ProjectId, ProjectData>(1, 50, 1_000)

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

const executeProposal = () => {}
const updateProposalState = () => {}
