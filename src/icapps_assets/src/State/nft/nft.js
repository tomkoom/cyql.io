import { createSlice } from "@reduxjs/toolkit";

const nft = createSlice({
  name: "nft",
  initialState: {
    registry: [],
    holders: [],
    holdersNum: 0,
    holdersOwnedNftsNum: [],
    supply: 0,
    listings: [],
    listingsNum: 0,
    floor: 0,
  },
  reducers: {
    setRegistry(state, { payload }) {
      state.registry = payload;
    },
    setHolders(state, { payload }) {
      state.holders = payload;
    },
    setHoldersNum(state, { payload }) {
      state.holdersNum = payload;
    },
    setHoldersOwnedNftsNum(state, { payload }) {
      state.holdersOwnedNftsNum = payload;
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
const selectHolders = (state) => state.nft.holders;
const selectHoldersNum = (state) => state.nft.holdersNum;
const selectHoldersOwnedNftsNum = (state) => state.nft.holdersOwnedNftsNum;
const selectSupply = (state) => state.nft.supply;
const selectListings = (state) => state.nft.listings;
const selectListingsNum = (state) => state.nft.listingsNum;
const selectFloor = (state) => state.nft.floor;

export {
  selectRegistry,
  selectHolders,
  selectHoldersNum,
  selectHoldersOwnedNftsNum,
  selectSupply,
  selectListings,
  selectListingsNum,
  selectFloor,
};

export const {
  setRegistry,
  setHolders,
  setHoldersNum,
  setHoldersOwnedNftsNum,
  setSupply,
  setListings,
  setListingsNum,
  setFloor,
} = nft.actions;
export default nft.reducer;
