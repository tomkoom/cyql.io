// vote
export type Yes = {
  yes: null
}

export type No = {
  no: null
}

export type Vote = Yes | No
export type VoteArgs = { vote: Vote; proposalId: number }

// data
export type ListProjectDataId = number
export type ListProjectData = {
  category: string[]

  // main
  name: string
  description: string
  domain: string
  backend_canister_id: string
  frontend_canister_id: string

  // logo
  logo_data_url: string

  // token
  token_ledger_id: string
  token_standard: string

  // web2 links
  x_twitter: string
  discord: string
  telegram: string
  github: string

  // web3 links
  taggr: string
  openchat: string
  dscvr: string
  funded: string

  // ic links
  dfinity_forum_showcase: string
  nns_launchpad_url: string

  // docs, whitepaper, etc
  docs: string
  whitepaper: string
}
