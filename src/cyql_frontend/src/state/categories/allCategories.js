import { createSlice } from "@reduxjs/toolkit";

const allCategories = createSlice({
  name: "allCategories",
  initialState: {
    allCategories: [
      { id: "all", label: "All", icon: "" },
      // wallets, defi, tokens, payments
      { id: "wallets", label: "Wallets", icon: "👛" },
      { id: "defi", label: "DeFi", icon: "‍🌾" },
      { id: "tokens", label: "Tokens", icon: "🪙" },
      { id: "stablecoins", label: "Stablecoins", icon: "🪙" },
      { id: "dexs", label: "DEXs", icon: "🐂" },
      { id: "swapping", label: "Swapping", icon: "↔️" },
      { id: "payments-invoicing", label: "Payments/Invoicing", icon: "🧾" },
      { id: "staking", label: "Staking", icon: "" },

      // games, gambling
      { id: "games", label: "Games", icon: "⚔️" },
      { id: "gambling", label: "Gambling", icon: "🎲" },
      // add p2e

      // tools, dev tools
      { id: "tools", label: "Tools", icon: "🛠️" },
      { id: "dev-tools", label: "Dev Tools", icon: "👨‍💻" },

      // communities, daos
      { id: "communities", label: "Communities", icon: "📣" },
      { id: "daos", label: "DAOs", icon: "🏠" },

      // infrastracture, cloud, storage, protocol
      { id: "infrastructure", label: "Infrastructure", icon: "🚀" },
      { id: "cloud", label: "Cloud", icon: "☁️" },
      { id: "protocol", label: "Protocol", icon: "" },
      { id: "search engines", label: "Search Engines", icon: "🌎" },

      // metaverse, ar/vr
      { id: "metaverse", label: "Metaverse", icon: "👓" },
      { id: "ar-vr", label: "AR/VR", icon: "👓" },

      // messaging
      { id: "messaging", label: "Messaging", icon: "💬" },

      //  ...

      { id: "nfts", label: "NFTs", icon: "🗿" },
      { id: "dapps", label: "dApps", icon: "🔗" },
      { id: "social-networks", label: "Social Networks", icon: "🎯" },
      { id: "explorers", label: "Explorers", icon: "🌎" },
      { id: "education", label: "Education", icon: "🎓" },
      { id: "marketplace", label: "Marketplace", icon: "🔄" },
      { id: "blogging", label: "Blogging", icon: "🗒️" },
      { id: "identity", label: "Identity", icon: "🔑" },

      // to add
      // dev tools to dev resources (?)
      // cloud/datastore
      // messaging
    ],
  },
  reducers: {
    setCategoryLength(state, { payload }) {
      state.allCategories ===
        {
          ...state.allCategories,
          ...payload,
        };
    },
  },
});

// selectors
const selectAllCategories = (state) => state.allCategories.allCategories;
export { selectAllCategories };

export const { setCategoryLength } = allCategories.actions;
export default allCategories.reducer;
