// https://github.com/tomkoom/cyql-api-docs
// state/_type/projectDoc -> projectDocData

const main = [
  { id: "name", label: "name", type: "text" },
  { id: "slug", label: "slug", type: "text" },
  { id: "website", label: "website", type: "text" },
  { id: "canister", label: "canister", type: "text" },
  { id: "logo", label: "logo", type: "text" },
];

const socials = [
  { id: "twitter", label: "twitter", type: "text" },
  { id: "discord", label: "discord", type: "text" },
  { id: "telegram", label: "telegram", type: "text" },
  { id: "github", label: "github", type: "text" },
  { id: "medium", label: "medium", type: "text" },

  // socials ic
  { id: "dscvr", label: "dscvr", type: "text" },
  { id: "distrikt", label: "distrikt", type: "text" },
  { id: "openchat", label: "openchat", type: "text" },
  { id: "taggr", label: "taggr", type: "text" },
  { id: "seers", label: "seers", type: "text" },
  { id: "nuance", label: "nuance", type: "text" },
  { id: "catalyze", label: "catalyze", type: "text" },
  { id: "funded", label: "funded", type: "text" },
];

const additional = [
  { id: "app", label: "app", type: "text" },
  { id: "docs", label: "docs", type: "text" },
  { id: "faq", label: "faq", type: "text" },
  { id: "whitepaper", label: "whitepaper", type: "text" },
];

const nft = [
  // nft
  { id: "nft_sale_date", label: "nft sale date", type: "date" },
  { id: "nft_sale_url", label: "sale url", type: "text" },
  { id: "nft_units", label: "units", type: "text" },
  { id: "nft_unit_price", label: "unit price", type: "text" },

  // nft markets
  { id: "nft_market", label: "market url", type: "text" },
  { id: "nft_market_entrepot", label: "entrepot url", type: "text" },
  { id: "nft_market_ccc", label: "ccc url", type: "text" },
  { id: "nft_market_yumi", label: "yumi url", type: "text" },

  // nft rarity
  { id: "nft_rarity", label: "rarity url" },
  { id: "nft_rarity_dgdg", label: "dgdg url" },

  // nft stats
  { id: "nft_stats", label: "nft stats url" },
  { id: "nft_stats_nftgeek", label: "nftgeek url" },

  // nft images
  { id: "nft_img_1", label: "preview img 1", type: "text" },
  { id: "nft_img_2", label: "preview img 2", type: "text" },
  { id: "nft_img_3", label: "preview img 3", type: "text" },
  { id: "nft_img_4", label: "preview img 4", type: "text" },
];

export { main, socials, additional, nft };
