import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"
import type { Category } from "@/state/_types/types"

interface AllCategoriesState {
  allCategories: Category[]
}

const initialState: AllCategoriesState = {
  allCategories: [
    { id: "all", label: "All" },

    // wallets, defi, tokens, payments
    { id: "wallets", label: "Wallets" },
    { id: "defi", label: "DeFi" },
    { id: "tokens", label: "Tokens" },
    { id: "stablecoins", label: "Stablecoins" },
    { id: "dexs", label: "DEXs" },
    { id: "swapping", label: "Swapping" },
    { id: "payments_invoicing", label: "Payments/Invoicing" },
    { id: "staking", label: "Staking" },

    // games, p2e
    { id: "games", label: "Games" },
    { id: "gambling", label: "Gambling" },
    { id: "betting", label: "Betting" },

    // tools, dev tools
    { id: "tools", label: "Tools" },
    { id: "dev_tools", label: "Dev Tools" },

    // communities, daos, governance
    { id: "communities", label: "Communities" },
    { id: "daos", label: "DAOs" },
    { id: "governance", label: "Governance" },

    // infrastracture, cloud, storage, protocol
    { id: "infrastructure", label: "Infrastructure" },
    { id: "cloud", label: "Cloud" },
    { id: "storage", label: "Storage" },
    { id: "protocol", label: "Protocol" },
    { id: "search_engines", label: "Search Engines" },

    // metaverse, ar/vr
    { id: "metaverse", label: "Metaverse" },
    { id: "ar_vr", label: "AR/VR" },

    // messaging, blogging
    { id: "messaging", label: "Messaging" },
    { id: "blogging", label: "Blogging" },

    // chains
    { id: "btc", label: "BTC" },
    { id: "ethereum", label: "Ethereum" },

    //  ...
    { id: "nfts", label: "NFTs" },
    { id: "dapps", label: "dApps" },
    { id: "social_networks", label: "Social Networks" },
    { id: "explorers", label: "Explorers" },
    { id: "education", label: "Education" },
    { id: "marketplace", label: "Marketplace" },
    { id: "identity", label: "Identity" },
    { id: "ai", label: "AI" },
    { id: "ecommerse", label: "Ecommerce" },
    { id: "vcs", label: "VCs" },
    { id: "automation", label: "Automation" },
  ],
}

const allCategories = createSlice({
  name: "allCategories",
  initialState,
  reducers: {},
})

// selectors
const selectAllCategories = (state: RootState) => state.allCategories.allCategories
export { selectAllCategories }

export const {} = allCategories.actions
export default allCategories.reducer
