export interface PromoModalData {
  color: string
  backgroundColor: string
  title: string
  text: string
  ctaUrl: string
  ctaText: string
}

export type Category = {
  id: string
  label: string
  icon: string
}

export type ProjectData = {
  id: string
  submittedBy: string
  createdAt: string
  updatedAt: string
  name: string
  description: string
  category: string[]
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
  upvotedBy: string[]
}
