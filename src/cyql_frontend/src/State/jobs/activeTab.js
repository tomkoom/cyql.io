import { createSlice } from "@reduxjs/toolkit";

const activeTab = createSlice({
  name: "activeTab",
  initialState: {
    activeTab: "hiring",
  },
  reducers: {
    setActiveTab(state, { payload }) {
      state.activeTab = payload;
    },
  },
});

const selectActiveTab = (state) => state.activeTab.activeTab;
export { selectActiveTab };

export const { setActiveTab } = activeTab.actions;
export default activeTab.reducer;
