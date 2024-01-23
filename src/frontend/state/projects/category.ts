import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"

interface CategoryState {
  category: string
}

const initialState: CategoryState = {
  category: "",
}

const category = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory(state, { payload }: PayloadAction<string>) {
      state.category = payload
    },
  },
})

export const selectCategory = (state: RootState) => state.category.category
export const { setCategory } = category.actions
export default category.reducer
