import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/state/_store";

interface FilterState {
  filterByOpenSource: null | boolean;
  filterByOnChain: null | boolean;
  filterByGrantee: null | boolean;
}

const initialState: FilterState = {
  filterByOpenSource: null,
  filterByOnChain: null,
  filterByGrantee: null,
};

const filter = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterByOpenSource(state, { payload }: PayloadAction<null | boolean>) {
      state.filterByOpenSource = payload;
    },
    setFilterByOnChain(state, { payload }: PayloadAction<null | boolean>) {
      state.filterByOnChain = payload;
    },
    setFilterByGrantee(state, { payload }: PayloadAction<null | boolean>) {
      state.filterByGrantee = payload;
    },
  },
});

const selectFilterByOpenSource = (state: RootState) => state.filter.filterByOpenSource;
const selectFilterByOnChain = (state: RootState) => state.filter.filterByOnChain;
const selectFilterByGrantee = (state: RootState) => state.filter.filterByGrantee;
export { selectFilterByOpenSource, selectFilterByOnChain, selectFilterByGrantee };

export const { setFilterByOpenSource, setFilterByOnChain, setFilterByGrantee } = filter.actions;
export default filter.reducer;
