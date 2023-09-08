import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"
import type { Category } from "../_types/types"

interface createSliceategoriesSortedByNumState {
  sorted: Category[]
}

const initialState: createSliceategoriesSortedByNumState = {
  sorted: [],
}

const categoriesSortedByNum = createSlice({
  name: "categoriesSortedByNum",
  initialState,
  reducers: {
    setCategoriesSortedByNum(state, { payload }: PayloadAction<Category[]>) {
      state.sorted = payload
    },
  },
})

const selectCategoriesSortedByNum = (state: RootState) => state.categoriesSortedByNum.sorted
export { selectCategoriesSortedByNum }

export const { setCategoriesSortedByNum } = categoriesSortedByNum.actions
export default categoriesSortedByNum.reducer
