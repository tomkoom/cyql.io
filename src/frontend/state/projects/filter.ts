import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

interface FilterState {
  filterByOpenSource: null | boolean
  filterByOnChain: null | boolean
}

const initialState: FilterState = {
  filterByOpenSource: null,
  filterByOnChain: null,
}

const filter = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterByOpenSource(state, { payload }: PayloadAction<null | boolean>) {
      state.filterByOpenSource = payload
    },
    setFilterByOnChain(state, { payload }: PayloadAction<null | boolean>) {
      state.filterByOnChain = payload
    },
  },
})

export const selectFilterByOpenSource = (state: RootState) => state.filter.filterByOpenSource
export const selectFilterByOnChain = (state: RootState) => state.filter.filterByOnChain

export const { setFilterByOpenSource, setFilterByOnChain } = filter.actions
export default filter.reducer
