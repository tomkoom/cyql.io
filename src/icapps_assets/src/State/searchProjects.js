import { createSlice } from "@reduxjs/toolkit";

const searchProjects = createSlice({
  name: "searchProjects",
  initialState: {
    search: "",
  },
  reducers: {
    setSearchProjects(state, { payload }) {
      state.search = payload;
    },
  },
});

export const selectSearchProjects = (state) => state.searchProjects.search;

export const { setSearchProjects } = searchProjects.actions;
export default searchProjects.reducer;
