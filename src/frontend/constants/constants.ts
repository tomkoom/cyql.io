import logo_color from "@/assets/logos/cyql_logo_color.svg"
import logo_gray from "@/assets/logos/cyql_logo_gray.svg"
import iclogo from "@/assets/logos/ic-logo.svg"

export const APP_NAME = "cyql"
export const APP_NAME_TLD = "cyql.io"

// env
export const II_ADMIN_1 = process.env.II_ADMIN_1
export const II_ADMIN_2 = process.env.II_ADMIN_2
export const II_ADMIN_3 = process.env.II_ADMIN_3
export const II_ADMIN_4 = process.env.II_ADMIN_4
export const ADMINS = [II_ADMIN_1, II_ADMIN_2, II_ADMIN_3, II_ADMIN_4]
export const DONATION_WALLET = process.env.DONATION_WALLET
export const KEY = process.env.API_KEY

// newtwork, host
export const NETWORK = process.env.DFX_NETWORK || (process.env.NODE_ENV === "production" ? "ic" : "local")
export const HOST = "https://icp0.io"

// canister ids
export const BACKEND_CANISTER_ID_IC = "nrkmt-haaaa-aaaai-qagmq-cai"
export const USERS_CANISTER_ID_IC = "dnqgz-fyaaa-aaaag-abxia-cai"
export const PROPOSALS_CANISTER_ID_IC = "bqnir-wqaaa-aaaag-abxhq-cai"
export const NFT_CANISTER_ID_IC = "dtlqp-nqaaa-aaaak-abwna-cai"
export const ICP_LEDGER_CANISTER_ID_IC = "ryjl3-tyaaa-aaaaa-aaaba-cai"
export const CKBTC_LEDGER_CANISTER_ID_IC = "mxzaz-hqaaa-aaaar-qaada-cai"

// ii
export const APP_DERIVATION_ORIGIN = "https://n7ib3-4qaaa-aaaai-qagnq-cai.icp0.io"
export const APP_ALTERNATIVE_ORIGIN = "https://cyql.io"

// links
export const X_URL = "https://x.com/cyqlio"
export const X_PROMOTE_URL =
  "https://x.com/messages/compose?recipient_id=1386304698358116354&text=Hi!%20I%20would%20like%20to%20promote%20my%20project%20on%20cyql.io"
export const DISCORD_URL = "https://discord.gg/AnjyrfvvXX"
export const GITHUB_URL = "https://github.com/tomkoom/cyql.io"
export const COOKIE_POLICY = "https://tomkoom.notion.site/cyql-io-cookie-policy-f48e5d0a4b194e68bdcce944a2d9193b"
export const PRICE_URL = "https://api.coingecko.com/api/v3/simple/price?ids=internet-computer&vs_currencies=usd&include_24hr_change=true"
export const FRONTEND_CANISTER_URL = "https://n7ib3-4qaaa-aaaai-qagnq-cai.ic0.app"
export const DONATION_WALLET_URL = "https://dashboard.internetcomputer.org/account/edf5163b9cc9084ae504ef56c239b0bfb6afbbc6e6e7c88e9cb3069fb2e135c1"
export const CYQL_MSG_URL = "https://twitter.com/messages/compose?recipient_id=1386304698358116354"
export const FLEX_SITE_URL = "https://qw6bl-qqaaa-aaaag-acika-cai.icp0.io"
export const X_DIRECT_MSG_URL = "https://twitter.com/messages/compose?recipient_id=1386304698358116354"

// nft
export const CYQL_NFT_FUNDED_URL = "https://marketplace.funded.app/collections/ic-apps"
export const CYQL_NFT_ENTREPOT_URL = "https://entrepot.app/marketplace/ic-apps"
export const CYQL_NFT_STATS_URL = "https://t5t44-naaaa-aaaah-qcutq-cai.raw.ic0.app/collection/dtlqp-nqaaa-aaaak-abwna-cai/summary"

// assets
export const IC_LOGO = iclogo
export const LOGO_COLOR = logo_color
export const LOGO_GRAY = logo_gray

// ...

export const E8S = 10 ** 8
export const ICP_FEE_E8S = 10_000

// ledgers
export const LEDGERS = [
  { symbol: "ckBTC", name: "ckBTC", id: CKBTC_LEDGER_CANISTER_ID_IC },
  { symbol: "ckETH", name: "ckETH", id: "ss2fx-dyaaa-aaaar-qacoq-cai" },
  { symbol: "CHAT", name: "CHAT", id: "2ouva-viaaa-aaaaq-aaamq-cai" },
  { symbol: "CAT", name: "CatalyzeDAO", id: "uf2wh-taaaa-aaaaq-aabna-cai" },
  { symbol: "BOOM", name: "BoomDAO", id: "vtrom-gqaaa-aaaaq-aabia-cai" },
  { symbol: "GHOST", name: "GHOST", id: "4c4fd-caaaa-aaaaq-aaa3a-cai" },
  { symbol: "HOT", name: "HotOrNot", id: "6rdgd-kyaaa-aaaaq-aaavq-cai" },
  { symbol: "ICL", name: "ICLighthouse DAO", id: "hhaaz-2aaaa-aaaaq-aacla-cai" },
  { symbol: "ICS", name: "ICPSwap Token", id: "ca6gz-lqaaa-aaaaq-aacwa-cai" },
  { symbol: "KINIC", name: "KINIC", id: "73mez-iiaaa-aaaaq-aaasq-cai" },
].sort((a, b) => {
  const textA = a.symbol.toUpperCase()
  const textB = b.symbol.toUpperCase()
  return textA < textB ? -1 : textA > textB ? 1 : 0
})
