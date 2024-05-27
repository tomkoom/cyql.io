import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"
import type { Paginated } from "@/state/_types/curated_projects_types"

interface PaginatedState {
  isLoading: boolean
  paginated: Paginated
}

const itemsPerPage = 50

const initialState: PaginatedState = {
  isLoading: false,
  paginated: {
    data: [],
    selectedPage: 1,
    itemsPerPage: itemsPerPage,
    startIndex: 0,
    endIndex: itemsPerPage,
    totalItems: 0,
    totalPages: 0,
  },
}

const paginated = createSlice({
  name: "paginated",
  initialState,
  reducers: {
    setPaginatedIsLoading(state, { payload }: PayloadAction<boolean>) {
      state.isLoading = payload
    },
    setPaginated(state, { payload }: PayloadAction<Paginated>) {
      state.paginated = payload
    },
  },
})

export const selectPaginatedIsLoading = (state: RootState) => state.paginated.isLoading
export const selectPaginated = (state: RootState) => state.paginated.paginated

export const { setPaginatedIsLoading, setPaginated } = paginated.actions
export default paginated.reducer
