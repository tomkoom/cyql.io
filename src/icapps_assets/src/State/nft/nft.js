import { createSlice } from "@reduxjs/toolkit";

const nft = createSlice({
  name: "nft",
  initialState: {
    registry: [],
    supply: 0,
    listings: [],
    listingsNum: 0,
    floor: 0,
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
    setFloor(state, { payload }) {
      state.floor = payload;
    },
  },
});

const selectRegistry = (state) => state.nft.registry;
const selectSupply = (state) => state.nft.supply;
const selectListings = (state) => state.nft.listings;
const selectListingsNum = (state) => state.nft.listingsNum;
const selectFloor = (state) => state.nft.floor;
export { selectRegistry, selectSupply, selectListings, selectListingsNum, selectFloor };

export const { setRegistry, setSupply, setListings, setListingsNum, setFloor } = nft.actions;
export default nft.reducer;
