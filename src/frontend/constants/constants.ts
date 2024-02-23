import iclogo from "@/assets/logos/ic-logo.svg"
import logo_color from "@/assets/logos/logo-color.svg"
import logo_gray from "@/assets/logos/logo-gray.svg"

export const II_ADMIN_1 = process.env.II_ADMIN_1
export const II_ADMIN_2 = process.env.II_ADMIN_2
export const II_ADMIN_3 = process.env.II_ADMIN_3
export const II_ADMIN_4 = process.env.II_ADMIN_4
export const ADMINS = [II_ADMIN_1, II_ADMIN_2, II_ADMIN_3, II_ADMIN_4]
export const DONATION_WALLET = process.env.DONATION_WALLET

// newtwork, host
export const NETWORK =
  process.env.DFX_NETWORK || (process.env.NODE_ENV === "production" ? "ic" : "local")
export const HOST = "https://icp0.io"

// canister ids
export const BACKEND_CANISTER_ID_IC = "nrkmt-haaaa-aaaai-qagmq-cai"
export const NFT_CANISTER_ID_IC = "dtlqp-nqaaa-aaaak-abwna-cai"
export const ICP_LEDGER_CANISTER_ID_IC = "ryjl3-tyaaa-aaaaa-aaaba-cai"

// juno
export const SUBMITTED_PROJECTS_COLL = process.env.JUNO_COLLECTION_SUBMITTED_PROJECTS

// ii
export const APP_DERIVATION_ORIGIN = "https://n7ib3-4qaaa-aaaai-qagnq-cai.icp0.io"
export const APP_ALTERNATIVE_ORIGIN = "https://cyql.io"

// links
export const X_URL = "https://x.com/cyqlio"
export const DISCORD_URL = "https://discord.gg/AnjyrfvvXX"
export const COOKIE_POLICY =
  "https://tomkoom.notion.site/cyql-io-cookie-policy-f48e5d0a4b194e68bdcce944a2d9193b"
export const PRICE_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=internet-computer&vs_currencies=usd&include_24hr_change=true"

// assets
export const IC_LOGO = iclogo
export const LOGO_COLOR = logo_color
export const LOGO_GRAY = logo_gray

// ...

export const PROJECTS_SEARCH_PARAMS_INITIAL = {
  category: "All",
  // openSource: "",
  // onchain: "",
  // order: "newest",
  q: "",
}
export const E8S = 10 ** 8
export const ICP_FEE_E8S = 10_000
