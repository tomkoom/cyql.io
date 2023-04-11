import { createSlice } from "@reduxjs/toolkit";

const adminSearch = createSlice({
  name: "adminSearch",
  initialState: {
    adminSearch: "",
  },
  reducers: {
    setAdminSearch(state, { payload }) {
      state.adminSearch = payload;
    },
  },
});

const selectAdminSearch = (state) => state.adminSearch.adminSearch;
export { selectAdminSearch };

export const { setAdminSearch } = adminSearch.actions;
export default adminSearch.reducer;
