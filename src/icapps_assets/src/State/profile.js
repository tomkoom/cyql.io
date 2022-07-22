import { createSlice } from "@reduxjs/toolkit";

const profile = createSlice({
  name: "profile",
  initialState: {
    ownsNFT: false,
    nftIdsOwned: [],
  },
  reducers: {
    setOwnsNFT(state, { payload }) {
      state.ownsNFT = payload;
    },
    setNFTIdsOwned(state, { payload }) {
      state.nftIdsOwned = payload;
    },
  },
});

const selectOwnsNFT = (state) => state.profile.ownsNFT;
const selectNFTIdsOwned = (state) => state.profile.nftIdsOwned;

export { selectOwnsNFT, selectNFTIdsOwned };
export const { setOwnsNFT, setNFTIdsOwned } = profile.actions;
export default profile.reducer;
