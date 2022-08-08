import { createSlice } from "@reduxjs/toolkit";

const profile = createSlice({
  name: "profile",
  initialState: {
    verified: false,
    ownsNFT: false,
    nftIdsOwned: [],
  },
  reducers: {
    setVerified(state, { payload }) {
      state.verified = payload;
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
const selectOwnsNFT = (state) => state.profile.ownsNFT;
const selectNFTIdsOwned = (state) => state.profile.nftIdsOwned;

export { selectVerified, selectOwnsNFT, selectNFTIdsOwned };
export const { setVerified, setOwnsNFT, setNFTIdsOwned } = profile.actions;
export default profile.reducer;
