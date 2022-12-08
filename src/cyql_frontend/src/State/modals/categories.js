import { createSlice } from "@reduxjs/toolkit";

const categories = createSlice({
  name: "categories",
  initialState: {
    categories: [
      { id: "all", label: "All", icon: "" },
      { id: "nfts", label: "NFTs", icon: "🗿" },
      { id: "infrastructure", label: "Infrastructure", icon: "🚀" },
      { id: "dapps", label: "dApps", icon: "🔗" },
      { id: "social-networks", label: "Social Networks", icon: "🎯" },
      { id: "defi", label: "DeFi", icon: "‍🌾" },
      { id: "tools", label: "Tools", icon: "🛠️" },
      { id: "communities", label: "Communities", icon: "📣" },
      { id: "games", label: "Games", icon: "⚔️" },
      { id: "gambling", label: "Gambling", icon: "🎲" },
      { id: "daos", label: "DAOs", icon: "🏠" },
      { id: "wallets", label: "Wallets", icon: "👛" },
      { id: "explorers", label: "Explorers", icon: "🌎" },
      { id: "metaverse", label: "Metaverse", icon: "👓" },
      { id: "vr", label: "VR", icon: "👓" },
      { id: "education", label: "Education", icon: "🎓" },
      { id: "tokens", label: "Tokens", icon: "🪙" },
      { id: "dev-tools", label: "Dev Tools", icon: "👨‍💻" },
      { id: "dexs", label: "DEXs", icon: "🐂" },
      { id: "swapping", label: "Swapping", icon: "↔️" },
    ],
  },
  reducers: {
    setCategoryLength(state, { payload }) {
      state.categories ===
        {
          ...state.categories,
          ...payload,
        };
    },
  },
});

// selectors
const selectCategories = (state) => state.categories.categories;
export { selectCategories };

export const { setCategoryLength } = categories.actions;
export default categories.reducer;
