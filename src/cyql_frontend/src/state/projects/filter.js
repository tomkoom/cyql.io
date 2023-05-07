import { createSlice } from "@reduxjs/toolkit";

const filter = createSlice({
  name: "filter",
  initialState: {
    filterByOpenSource: null,
    filterByOnChain: null,
    filterByGrantee: null,
  },
  reducers: {
    setFilterByOpenSource(state, { payload }) {
      state.filterByOpenSource = payload;
    },
    setFilterByOnChain(state, { payload }) {
      state.filterByOnChain = payload;
    },
    setFilterByGrantee(state, { payload }) {
      state.filterByGrantee = payload;
    },
  },
});

const selectFilterByOpenSource = (state) => state.filter.filterByOpenSource;
const selectFilterByOnChain = (state) => state.filter.filterByOnChain;
const selectFilterByGrantee = (state) => state.filter.filterByGrantee;
export { selectFilterByOpenSource, selectFilterByOnChain, selectFilterByGrantee };

export const { setFilterByOpenSource, setFilterByOnChain, setFilterByGrantee } = filter.actions;
export default filter.reducer;
