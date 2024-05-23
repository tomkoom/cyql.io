import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

export type SortOptions =
  | "newest_first"
  | "oldest_first"
  | "most_upvoted"
  | "least_upvoted"
  | "recently_updated"

interface SortState {
  sort: SortOptions
  sortModal: boolean
}

const initialState: SortState = {
  sort: "newest_first",
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
