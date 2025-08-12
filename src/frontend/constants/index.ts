import { MODE } from "./env"

export { ADMINS } from "./admins"
export { IC_LOGO, iclogo, LOGO_COLOR, logo_color, LOGO_GRAY, logo_gray } from "./assets"
export { CANISTER_IDS } from "./canisters"
export { API_KEY, DONATION_WALLET, MODE, NETWORK } from "./env"
export { NOTION_LIST_PROJECT_EMBED_URL, NOTION_LIST_PROJECT_FORM_URL } from "./notion"
export { ROUTES } from "./routes"

export const APP_NAME = "cyql"
export const APP_NAME_TLD = "cyql.io"
export const HOST = "https://icp0.io"

export const IS_DEV = MODE === "development"
export const IS_PROD = MODE === "production"

// ii
export const APP_DERIVATION_ORIGIN = "https://n7ib3-4qaaa-aaaai-qagnq-cai.icp0.io"
export const APP_ALTERNATIVE_ORIGIN = "https://cyql.io"

export const REFERRAL_LINKS = {
  kairos: "https://www.kairos.win?ref=cyqlio",
}
