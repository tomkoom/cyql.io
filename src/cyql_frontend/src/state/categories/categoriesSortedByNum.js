import { createSlice } from "@reduxjs/toolkit";

const categoriesSortedByNum = createSlice({
  name: "categoriesSortedByNum",
  initialState: {
    categoriesSortedByNum: [],
  },
  reducers: {
    setCategoriesSortedByNum(state, { payload }) {
      state.categoriesSortedByNum = payload;
    },
  },
});

const selectCategoriesSortedByNum = (state) => state.categoriesSortedByNum.categoriesSortedByNum;
export { selectCategoriesSortedByNum };

export const { setCategoriesSortedByNum } = categoriesSortedByNum.actions;
export default categoriesSortedByNum.reducer;
