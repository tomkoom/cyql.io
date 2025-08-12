export const DONATION_WALLET = process.env.DONATION_WALLET || ""
export const API_KEY = process.env.API_KEY || ""
export const MODE = process.env.NODE_ENV
export const NETWORK = process.env.DFX_NETWORK || (process.env.NODE_ENV === "production" ? "ic" : "local")
