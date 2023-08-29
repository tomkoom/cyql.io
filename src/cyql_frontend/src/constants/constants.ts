export const II_ADMIN_1 = process.env.II_ADMIN_1;
export const II_ADMIN_2 = process.env.II_ADMIN_2;
export const DONATION_WALLET = process.env.DONATION_WALLET;
export const COOKIE_POLICY =
  "https://tomkoom.notion.site/cyql-io-cookie-policy-f48e5d0a4b194e68bdcce944a2d9193b";

// juno
export const SATELLITE_ID = process.env.JUNO_SATELLITE_ID;
export const PROJECTS_COLL = process.env.JUNO_COLLECTION_PROJECTS;
export const SUBMITTED_PROJECTS_COLL = process.env.JUNO_COLLECTION_SUBMITTED_PROJECTS;

// assets
export const IC_LOGO =
  "https://ipfs.io/ipfs/Qmb9YRW5j6nqsjpaT7DT8E66MTKFK9kdhEcofwjeXjJvaq?filename=ic-logo.svg";

// ii
export const APP_DERIVATION_ORIGIN = "https://n7ib3-4qaaa-aaaai-qagnq-cai.icp0.io";
export const APP_ALTERNATIVE_ORIGIN = "https://cyql.io";

// network
export const NETWORK =
  process.env.DFX_NETWORK || (process.env.NODE_ENV === "production" ? "ic" : "local");
