import { createSlice } from "@reduxjs/toolkit";

const loadMore = createSlice({
  name: "loadMore",
  initialState: {
    itemsVisible: { value: 36 },
  },
  reducers: {
    setItemsVisible({ itemsVisible }) {
      itemsVisible.value += 36;
    },
  },
});

export const selectItemsVisible = (state) => state.loadMore.itemsVisible.value;

export const { setItemsVisible } = loadMore.actions;
export default loadMore.reducer;
