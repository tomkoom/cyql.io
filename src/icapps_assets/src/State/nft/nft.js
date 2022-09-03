import { createSlice } from "@reduxjs/toolkit";

const nft = createSlice({
  name: "nft",
  initialState: {
    registry: [],
    supply: 0,
    listings: [],
    listingsNum: 0,
  },
  reducers: {
    setRegistry(state, { payload }) {
      state.registry = payload;
    },
    setSupply(state, { payload }) {
      state.supply = payload;
    },
    setListings(state, { payload }) {
      state.listings = payload;
    },
    setListingsNum(state, { payload }) {
      state.listingsNum = payload;
    },
  },
});

const selectRegistry = (state) => state.nft.registry;
const selectSupply = (state) => state.nft.supply;
const selectListings = (state) => state.nft.listings;
const selectListingsNum = (state) => state.nft.listingsNum;
export { selectRegistry, selectSupply, selectListings, selectListingsNum };

export const { setRegistry, setSupply, setListings, setListingsNum } = nft.actions;
export default nft.reducer;
