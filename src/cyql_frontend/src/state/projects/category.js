import { createSlice } from "@reduxjs/toolkit";

const category = createSlice({
  name: "category",
  initialState: {
    category: "All",
  },
  reducers: {
    setCategory(state, { payload }) {
      state.category = payload;
    },
  },
});

export const selectCategory = (state) => state.category.category;

export const { setCategory } = category.actions;
export default category.reducer;
