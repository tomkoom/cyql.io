// https://tomkoom.gitbook.io/cyql-api/data-formats/project-doc
// datastore collection: cyql-projects

// todos
// [ ] add token information: token_name, token_symbol, token_logo, token_canister_id, token_markets, token_type, etc
// [ ] nft_contract

const projectDocData = {
  // main
  name: "",
  slug: "",
  description: "",
  categories: [],

  // main links
  logo: "",
  website: "",
  canister: "",

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
  funded: "",

  // additional
  app: "",
  docs: "",
  faq: "",
  whitepaper: "",
  grantee: false,

  // nft
  nft_sale_date: "",
  nft_sale_url: "",
  nft_units: "",
  nft_unit_price: "",

  // nft market
  nft_market: "",
  nft_market_entrepot: "",
  nft_market_ccc: "",
  nft_market_yumi: "",

  // nft rarity
  nft_rarity: "",
  nft_rarity_dgdg: "",

  // nft stats
  nft_stats: "",
  nft_stats_nftgeek: "",

  // nft previews
  nft_img_1: "",
  nft_img_2: "",
  nft_img_3: "",
  nft_img_4: "",

  // meta
  added: null,
  updated: null,
  archived: false,

  // upvotes
  upvotes: [],
};

const projectDoc = {
  created_at: 0, // initially bigint
  data: projectDocData,
  key: "",
  owner: "",
  updated_at: 0, // initially bigint
};

export { projectDoc };
