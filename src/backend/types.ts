import { nat8, nat64, Principal, Record, Vec, Opt } from "azle"

export type ProjectId = string

export type ProjectProposal = Record<{
  id: ProjectId
  proposalNumber: nat64
  proposer: Principal
  projectData: ProjectData
}>

export type ProjectData = Record<{
  title: string
}>

export type Doc = Record<{
  updated_at: nat64
  owner: Principal
  data: Vec<nat8>
  description: Opt<string>
  created_at: nat64
}>
