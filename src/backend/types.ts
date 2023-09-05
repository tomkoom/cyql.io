import { nat8, nat64, Principal, Record, Vec, Opt } from "azle"

export type ProjectId = string

export type ProjectProposal = Record<{
  id: ProjectId
  proposalNumber: nat64
  proposer: Principal
  projectData: ProjectData
}>

export type ProjectData = Record<{
  id: string
  submittedBy: string
  createdAt: string
  updatedAt: string
  name: string
  description: string
  category: Vec<string>
  logo: string
  website: string
  canister: string
  twitter: string
  discord: string
  telegram: string
  github: string
  medium: string
  dscvr: string
  distrikt: string
  openchat: string
  taggr: string
  seers: string
  nuance: string
  catalyze: string
  funded: string
  app: string
  docs: string
  faq: string
  whitepaper: string
  grantee: boolean
  archived: boolean
  nftSaleDate: string
  nftSaleUrl: string
  nftUnits: string
  nftUnitPrice: string
  nftMarketEntrepot: string
  nftMarketCcc: string
  nftMarketYumi: string
  nftRarityDgdg: string
  nftStatsNftgeek: string
  nftImg1: string
  nftImg2: string
  nftImg3: string
  nftImg4: string
  upvotedBy: Vec<string>
}>

export type Doc = Record<{
  updated_at: nat64
  owner: Principal
  data: Vec<nat8>
  description: Opt<string>
  created_at: nat64
}>

export type Test = Record<{
  test: string
}>
