// backend/main_types.mo

// pagination, sorting, filtering

export interface RefreshProjectsArgs {
  filterByCategory: string
  filterByOpenSource: [] | [boolean]
  filterByOnchain: [] | [boolean]
  sort: SortOptions
  page: number
  pageSize: number
}

export type SortOptions =
  | { newest_first: null }
  | { oldest_first: null }
  | { most_upvoted: null }
  | { least_upvoted: null }
  | { recently_updated: null }

export interface Paginated {
  data: ProjectV2[]
  selectedPage: number
  itemsPerPage: number
  startIndex: number
  endIndex: number
  totalItems: number
  totalPages: number
}

export type ProjectId = string
export type Secret = string
export type ProjectV2 = {
  // main
  id: ProjectId
  name: string
  description: string
  category: string[]
  website: string

  // logo
  logoUrl: string
  logoDataUrl: string

  // links web2
  twitter: string
  discord: string
  telegram: string
  github: string
  medium: string

  // links web3
  dscvr: string
  distrikt: string
  openchat: string
  taggr: string
  seers: string
  nuance: string
  catalyze: string
  funded: string

  // nft
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

  // ...
  app: string
  docs: string
  faq: string
  whitepaper: string

  // canisters
  frontendCanisterId: string
  backendCanisterId: string

  // ...
  dfinityForumShowcase: string
  nnsLaunchpadUrl: string

  // token
  tokenCanisterId: string
  tokenStandard: string

  // meta
  archived: boolean
  createdAt: string
  updatedAt: string
  submittedBy: string
  upvotedBy: string[]
}
