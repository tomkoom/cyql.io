import { createSlice } from "@reduxjs/toolkit";

const profile = createSlice({
  name: "profile",
  initialState: {
    ownsNFT: false,
  },
  reducers: {
    setOwnsNFT(state, { payload }) {
      state.ownsNFT = payload;
    },
  },
});

const selectOwnsNFT = (state) => state.profile.ownsNFT;

export { selectOwnsNFT };
export const { setOwnsNFT } = profile.actions;
export default profile.reducer;
