import type { Project } from "@/state/types/Project"

export const projectInitialState: Project = {
  // main
  id: "",
  name: "",
  description: "",
  category: [],
  website: "",

  // logo
  logoUrl: "",
  logoDataUrl: "",

  // links web2
  twitter: "",
  discord: "",
  telegram: "",
  github: "",
  medium: "",

  // links web3
  dscvr: "",
  distrikt: "",
  openchat: "",
  taggr: "",
  seers: "",
  nuance: "",
  catalyze: "",
  funded: "",

  // nft
  nftSaleDate: "",
  nftSaleUrl: "",
  nftUnits: "",
  nftUnitPrice: "",
  nftMarketEntrepot: "",
  nftMarketCcc: "",
  nftMarketYumi: "",
  nftRarityDgdg: "",
  nftStatsNftgeek: "",
  nftImg1: "",
  nftImg2: "",
  nftImg3: "",
  nftImg4: "",

  // ...
  app: "",
  docs: "",
  faq: "",
  whitepaper: "",

  // canisters
  frontendCanisterId: "",
  backendCanisterId: "",

  // ...
  dfinityForumShowcase: "",
  nnsLaunchpadUrl: "",

  // token
  tokenCanisterId: "",
  tokenStandard: "",

  // meta
  archived: false,
  createdAt: "",
  updatedAt: "",
  submittedBy: "",
  upvotedBy: [],
}
