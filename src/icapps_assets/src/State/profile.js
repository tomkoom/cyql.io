import { createSlice } from "@reduxjs/toolkit";

const profile = createSlice({
  name: "profile",
  initialState: {
    verified: false,
    upvotedProjects: [],
    ownsNFT: false,
    nftIdsOwned: [],
  },
  reducers: {
    setVerified(state, { payload }) {
      state.verified = payload;
    },
    setUpvotedProjects(state, { payload }) {
      state.upvotedProjects = payload;
    },
    setOwnsNFT(state, { payload }) {
      state.ownsNFT = payload;
    },
    setNFTIdsOwned(state, { payload }) {
      state.nftIdsOwned = payload;
    },
  },
});

// selectors
const selectVerified = (state) => state.profile.verified;
const selectUpvotedProjects = (state) => state.profile.upvotedProjects;
const selectOwnsNFT = (state) => state.profile.ownsNFT;
const selectNFTIdsOwned = (state) => state.profile.nftIdsOwned;

export { selectVerified, selectUpvotedProjects, selectOwnsNFT, selectNFTIdsOwned };
export const { setVerified, setUpvotedProjects, setOwnsNFT, setNFTIdsOwned } = profile.actions;
export default profile.reducer;
