import { createSlice } from "@reduxjs/toolkit";

const projects = createSlice({
  name: "projects",
  initialState: {
    projects: {
      arr: [],
      arrLength: 0,
    },
    nfts: {
      arr: [],
      arrLength: 0,
    },
  },
  reducers: {
    setProjects(state, { payload }) {
      state.projects.arr = [...payload];
      state.projects.arrLength = state.projects.arr.length;
    },
    setNFTs(state, { payload }) {
      state.nfts.arr = [...payload];
      state.nfts.arrLength = state.nfts.arr.length;
    },
  },
});

export const selectProjects = (state) => state.projects.projects.arr;
export const selectProjectsLength = (state) => state.projects.projects.arrLength;
export const selectNFTs = (state) => state.projects.nfts.arr;
export const selectNFTsLength = (state) => state.projects.nfts.arrLength;


export const { setProjects, setNFTs } = projects.actions;
export default projects.reducer;
