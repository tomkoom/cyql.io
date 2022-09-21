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

const selectProjects = (state) => state.projects.projects.arr;
const selectProjectsLength = (state) => state.projects.projects.arrLength;
const selectNFTs = (state) => state.projects.nfts.arr;
const selectNFTsLength = (state) => state.projects.nfts.arrLength;
const selectUpcomingNFTs = (state) =>
  state.projects.nfts.arr.filter((nft) => nft.nftSaleStatus === "Upcoming");
const selectOngoingNFTs = (state) =>
  state.projects.nfts.arr.filter((nft) => nft.nftSaleStatus === "Open");

export {
  selectProjects,
  selectProjectsLength,
  selectNFTs,
  selectNFTsLength,
  selectUpcomingNFTs,
  selectOngoingNFTs,
};

export const { setProjects, setNFTs } = projects.actions;
export default projects.reducer;
