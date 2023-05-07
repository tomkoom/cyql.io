import { createSlice } from "@reduxjs/toolkit";

const search = createSlice({
  name: "search",
  initialState: {
    search: "",
  },
  reducers: {
    setSearch(state, { payload }) {
      state.search = payload;
    },
  },
});

const selectSearch = (state) => state.search.search;
export { selectSearch };

export const { setSearch } = search.actions;
export default search.reducer;
