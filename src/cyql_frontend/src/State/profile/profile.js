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

// selectors
const selectVerified = (state) => state.profile.verified;
const selectUpvotedProjects = (state) => state.profile.upvotedProjects;
const selectOwnsNft = (state) => state.profile.ownsNft;
export { selectVerified, selectUpvotedProjects, selectOwnsNft };

export const { setVerified, setUpvotedProjects, setOwnsNft } = profile.actions;
export default profile.reducer;
