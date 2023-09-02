import { ic, $query, $update, StableBTreeMap, Opt, Vec } from "azle"

// utils
import { projectId } from "../frontend/utils/projectId"

// types
import { ProposedProjectId, ProposedProject, ProjectData } from "./types"

// maps
const projectProposals = new StableBTreeMap<ProposedProjectId, ProposedProject>(0, 50, 1_000)

$query
export function getProjectProposals(): Vec<ProposedProject> {
  return projectProposals.values()
}

$update
export function addProjectProposal(projectData: ProjectData): Opt<ProposedProject> {
  const id = projectId()
  const proposal_number = projectProposals.len()
  const proposer = ic.id()

  const projectProposal = {
    id,
    proposal_number,
    proposer,
    projectData,
  }
  return projectProposals.insert(id, projectProposal)
}

// get juno projects
