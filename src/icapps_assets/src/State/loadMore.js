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

export const { setItemsVisible } = loadMore.actions;
export default loadMore.reducer;