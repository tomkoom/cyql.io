import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"
import type { SortOptions } from "../../../declarations/backend/backend.did"

interface SortState {
  sort: SortOptions
  sortModal: boolean
}

const initialState: SortState = {
  sort: { newest_first: null },
  sortModal: false,
}

const sort = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSort(state, { payload }: PayloadAction<SortOptions>) {
      state.sort = payload
    },
    setSortModal(state, { payload }: PayloadAction<boolean>) {
      state.sortModal = payload
    },
  },
})

export const selectSort = (state: RootState) => state.sort.sort
export const selectSortModal = (state: RootState) => state.sort.sortModal

export const { setSort, setSortModal } = sort.actions
export default sort.reducer
