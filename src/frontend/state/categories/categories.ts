import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"
import type { CategoryWithSize } from "@/state/_types/curated_projects_types"

interface CategoriesState {
  categoriesWithSize: CategoryWithSize[]
}

const initialState: CategoriesState = {
  categoriesWithSize: [],
}

const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategoriesWithSize(state, { payload }: PayloadAction<CategoryWithSize[]>) {
      state.categoriesWithSize = payload
    },
  },
})

export const selectCategories = (state: RootState) => state.categories

export const { setCategoriesWithSize } = categories.actions
export default categories.reducer
