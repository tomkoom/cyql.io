import { createSlice } from "@reduxjs/toolkit";

const filter = createSlice({
  name: "filter",
  initialState: {
    filterByOpenSource: "all",
    filterByOnChain: "all",
  },
  reducers: {
    setFilterByOpenSource(state, { payload }) {
      state.filterByOpenSource = payload;
    },
    setFilterByOnChain(state, { payload }) {
      state.filterByOnChain = payload;
    },
  },
});

const selectFilterByOpenSource = (state) => state.filter.filterByOpenSource;
const selectFilterByOnChain = (state) => state.filter.filterByOnChain;

export { selectFilterByOpenSource, selectFilterByOnChain };
export const { setFilterByOpenSource, setFilterByOnChain } = filter.actions;
export default filter.reducer;
