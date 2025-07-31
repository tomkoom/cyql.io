// Import canister IDs from dfx-generated JSON file
import canisterIds from "../../../canister_ids.json"

// Additional canister IDs not managed by dfx
const NFT_CANISTER_ID = "dtlqp-nqaaa-aaaak-abwna-cai"
const ICP_LEDGER_CANISTER_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai"
const CKBTC_LEDGER_CANISTER_ID = "mxzaz-hqaaa-aaaar-qaada-cai"

export const CANISTER_IDS = {
  MAINNET: {
    BACKEND: canisterIds.backend.ic,
    FRONTEND: canisterIds.frontend.ic,
    ASSETS: canisterIds.assets.ic,
    USERS: canisterIds.users.ic,
    PROPOSALS: canisterIds.proposals.ic,
    NFT: NFT_CANISTER_ID,
    ICP_LEDGER: ICP_LEDGER_CANISTER_ID,
    CKBTC_LEDGER: CKBTC_LEDGER_CANISTER_ID,
  },
}
