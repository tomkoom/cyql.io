import { createSlice } from "@reduxjs/toolkit";

const categories = createSlice({
  name: "categories",
  initialState: {
    categories: [
      { id: "all", name: "All", icon: "" },
      { id: "nfts", name: "NFTs", icon: "🗿" },
      { id: "infrastructure", name: "Infrastructure", icon: "🚀" },
      { id: "dapps", name: "dApps", icon: "🔗" },
      { id: "social-networks", name: "Social Networks", icon: "🎯" },
      { id: "defi", name: "DeFi", icon: "‍🌾" },
      { id: "tools", name: "Tools", icon: "🛠️" },
      { id: "communities", name: "Communities", icon: "📣" },
      { id: "games", name: "Games", icon: "⚔️" },
      { id: "daos", name: "DAOs", icon: "🏠" },
      { id: "wallets", name: "Wallets", icon: "👛" },
      { id: "explorers", name: "Explorers", icon: "🌎" },
      { id: "metaverse", name: "Metaverse", icon: "" },
      { id: "education", name: "Education", icon: "🎓" },
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

export const selectCategories = (state) => state.categories.categories;

export const { setCategoryLength } = categories.actions;
export default categories.reducer;
