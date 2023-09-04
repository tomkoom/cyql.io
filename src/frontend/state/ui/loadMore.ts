import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

interface LoadMoreState {
  itemsVisibleProjects: number
}

const initialState: LoadMoreState = {
  itemsVisibleProjects: 64,
}

const loadMore = createSlice({
  name: "loadMore",
  initialState,
  reducers: {
    setItemsVisibleProjects(state, { payload }: PayloadAction<number>) {
      state.itemsVisibleProjects += payload
    },
  },
})

export const selectItemsVisibleProjects = (state: RootState) => state.loadMore.itemsVisibleProjects

export const { setItemsVisibleProjects } = loadMore.actions
export default loadMore.reducer
