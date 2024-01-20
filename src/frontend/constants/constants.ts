export const II_ADMIN_1 = process.env.II_ADMIN_1
export const II_ADMIN_2 = process.env.II_ADMIN_2
export const ADMINS = [II_ADMIN_1, II_ADMIN_2]
export const DONATION_WALLET = process.env.DONATION_WALLET

// newtwork, host
export const NETWORK =
  process.env.DFX_NETWORK || (process.env.NODE_ENV === "production" ? "ic" : "local")
export const HOST = "https://icp0.io"

// canister ids
export const BACKEND_CANISTER_ID_IC = "nrkmt-haaaa-aaaai-qagmq-cai"

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
export const IC_LOGO =
  "https://ipfs.io/ipfs/Qmb9YRW5j6nqsjpaT7DT8E66MTKFK9kdhEcofwjeXjJvaq?filename=ic-logo.svg"
