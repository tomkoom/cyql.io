import { nat64, Principal } from "azle"

export type ProposedProjectId = string

export type ProposedProject = {
  id: ProposedProjectId
  proposal_number: nat64
  proposer: Principal
  projectData: ProjectData
}

export type ProjectData = {
  title: string
}
