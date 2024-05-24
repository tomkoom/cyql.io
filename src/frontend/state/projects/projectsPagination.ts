import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"
import type { Pagination } from "@/state/_types/types"

interface ProjectsPaginationState {
  pagination: Pagination
}

const itemsPerPage = 50

const initialState: ProjectsPaginationState = {
  pagination: {
    itemsPerPage,
    itemOffset: 0,
    endOffset: itemsPerPage,
    totalItems: 0,
    selectedPage: 0,
  },
}

const projectsPagination = createSlice({
  name: "projectsPagination",
  initialState,
  reducers: {
    setProjectsPaginationItemsPerPage(state, { payload }: PayloadAction<number>) {
      state.pagination.itemsPerPage = payload
    },
    setProjectsPaginationItemOffset(state, { payload }: PayloadAction<number>) {
      state.pagination.itemOffset = payload
    },
    setProjectsPaginationEndOffset(state, { payload }: PayloadAction<number>) {
      state.pagination.endOffset = payload
    },
    setProjectsPaginationTotalItems(state, { payload }: PayloadAction<number>) {
      state.pagination.totalItems = payload
    },
    setProjectsPaginationSelectedPage(state, { payload }: PayloadAction<number>) {
      state.pagination.selectedPage = payload
    },
  },
})

export const selectProjectsPagination = (state: RootState) => state.projectsPagination.pagination

export const {
  setProjectsPaginationItemsPerPage,
  setProjectsPaginationItemOffset,
  setProjectsPaginationEndOffset,
  setProjectsPaginationTotalItems,
  setProjectsPaginationSelectedPage,
} = projectsPagination.actions
export default projectsPagination.reducer
