// vote
export type Yes = {
  yes: null
}

export type No = {
  no: null
}

export type Vote = Yes | No
export type VoteArgs = { vote: Vote; proposalId: number }
// export type VoteArgs2 = { vote: Vote; votingPower: number; proposalId: number }

// data
export type ProjectProposalDataId = number
export type ProjectProposalData = {
  category: string[]

  // main
  name: string
  description: string
  domain: string
  backendCanisterId: string
  frontendCanisterId: string

  // token
  tokenLedgerId: string
  tokenStandard: string

  // web2 links
  x: string
  discord: string
  telegram: string
  github: string

  // web3 links
  taggr: string
  openchat: string
  dscvr: string
  funded: string

  // ic links
  dfinityForumShowcase: string
  nnsProjectUrl: string

  // docs, whitepaper, etc
  docs: string
  whitepaper: string
}
