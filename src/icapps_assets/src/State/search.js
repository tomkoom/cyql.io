import { createSlice } from "@reduxjs/toolkit";

const search = createSlice({
  name: "search",
  initialState: {
    search: "",
  },
  reducers: {
    setSearch(state, { payload }) {
      console.log(payload);
      state.search = payload;
    },
  },
});

export const selectSearch = (state) => state.search.search;

export const { setSearch } = search.actions;
export default search.reducer;
