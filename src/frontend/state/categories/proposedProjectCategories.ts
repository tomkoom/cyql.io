import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

interface ProposedProjectCategoriesState {
  categories: string[]
}

const categories = [
  // infrastructure
  "infrastructure",
  "storage",
  "computing",
  "search_engines",
  "protocol",
  "automation",
  "developer_tooling",

  // anaytics
  "analytics",
  "explorers",

  // identity
  "identity",
  "identity_providers",

  // communication
  "communication",
  "social_networks",
  "messaging",

  // defi
  "defi",
  "staking",
  "wallets",
  "dexs_swapping",

  // games, metaverse, ar/vr
  "games",
  "metaverse",
  "ar_vr",
  "p2e",
  "betting",

  // governance
  "governance",
  "daos",

  // nfts
  "nfts",
  "nft_analytics",
  "inscriptions",

  // btc
  "btc",

  // ethereum
  "ethereum",

  // other
  "other",
  "dapps",
  "education",
  "payments_invoicing",

  // ...
  "communities",
  "vcs",

  // ...
  "ai",
]

const initialState: ProposedProjectCategoriesState = {
  categories,
}

const proposedProjectCategories = createSlice({
  name: "proposedProjectCategories",
  initialState,
  reducers: {},
})

// selectors
export const selectProposedProjectCategories = (state: RootState) => state.proposedProjectCategories.categories

export const {} = proposedProjectCategories.actions
export default proposedProjectCategories.reducer
