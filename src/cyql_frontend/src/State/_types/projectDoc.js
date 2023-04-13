// https://tomkoom.gitbook.io/cyql-api/data-formats/project-doc

const projectDocData = {
  __id__: "",
  name: "",
  id: "",
  slug: "",
  category: [],
  website: "",
  canister: "",
  logo: "",
  description: "",
  twitter: "",
  discord: "",
  telegram: "",
  github: "",
  medium: "",
  dscvr: "",
  distrikt: "",
  openChat: "",
  taggr: "",
  seers: "",
  nuance: "",
  catalyze: "",
  app: "",
  docs: "",
  faq: "",
  whitepaper: "",
  nftSaleStatus: "",
  nftSaleDate: "",
  nftUnits: "",
  nftUnitPrice: "",
  nftMarketUrl: "",
  nftSaleUrl: "",
  nftRarityChecker: "",
  nftImg1: "",
  nftImg2: "",
  nftImg3: "",
  nftImg4: "",
  added: null,
  edited: null,
  hasToken: null,
  verified: null,
  promoted: null,
  grantee: null,
  upvotedBy: [],
  connectedProjects: [],
  crowdfundingUrl: "",
};

const projectDoc = {
  created_at: 0,
  data: projectDocData,
  key: "",
  owner: "",
  updated_at: 0,
};

// to update https://tomkoom.gitbook.io/cyql-api/data-formats/project-doc
const projectDocData2 = {
  // main
  name: "",
  slug: "",
  categories: [],
  description: "",

  // main links
  website: "",
  canister: "",
  logo: "",

  // socials
  twitter: "",
  discord: "",
  telegram: "",
  github: "",
  medium: "",

  // socials ic
  dscvr: "",
  distrikt: "",
  openchat: "",
  taggr: "",
  seers: "",
  nuance: "",
  catalyze: "",

  // additional
  app: "",
  docs: "",
  faq: "",
  whitepaper: "",
  crowdfunding: "",
  verified: null,
  grantee: null,

  // nft
  nft_sale_status: "",
  nft_sale_date: "",
  nft_units: "",
  nft_unit_price: "",
  nft_market_url: "",
  nft_sale_url: "",
  nft_rarity_checker: "",
  nft_example_img_1: "",
  nft_example_img_2: "",
  nft_example_img_3: "",
  nft_example_img_4: "",

  // meta
  added: null,
  edited: null,

  // token
  has_token: null,
  // tokenName: "",
  // tokenSymbol: "",
  // tokenLogo: "",
  // tokenCanisterId: "",
  // tokenMarkets: [],
  // tokenSupply: "",
  // tokenMaxSupply: "",

  // upvotes
  upvotes: [],
};

export { projectDoc };
