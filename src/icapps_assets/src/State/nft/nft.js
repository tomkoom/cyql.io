import { createSlice } from "@reduxjs/toolkit";

const nft = createSlice({
  name: "nft",
  initialState: {
    registry: [],
    listings: 0,
    supply: 0,
  },
  reducers: {
    setRegistry(state, { payload }) {
      state.registry = payload;
    },
  },
});

const selectRegistry = (state) => state.nft.registry;
export { selectRegistry };

export const { setRegistry } = nft.actions;
export default nft.reducer;
