import { createSlice } from "@reduxjs/toolkit";

const profile = createSlice({
  name: "profile",
  initialState: {
    verified: false,
    upvotedProjects: [],
    ownsNft: undefined,
  },
  reducers: {
    setVerified(state, { payload }) {
      state.verified = payload;
    },
    setUpvotedProjects(state, { payload }) {
      state.upvotedProjects = payload;
    },
    setOwnsNft(state, { payload }) {
      state.ownsNft = payload;
    },
  },
});

export const selectVerified = (state) => state.profile.verified;
export const selectUpvotedProjects = (state) => state.profile.upvotedProjects;
export const selectOwnsNft = (state) => state.profile.ownsNft;

export const { setVerified, setUpvotedProjects, setOwnsNft } = profile.actions;
export default profile.reducer;
