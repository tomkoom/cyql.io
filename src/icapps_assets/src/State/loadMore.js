import { createSlice } from "@reduxjs/toolkit";

const loadMore = createSlice({
  name: "loadMore",
  initialState: {
    itemsVisible: { value: 36 },
    itemsVisible2: 48,
  },
  reducers: {
    setItemsVisible({ itemsVisible }) {
      itemsVisible.value += 36;
    },
    setItemsVisible2(state, { payload }) {
      state.itemsVisible2 += payload;
    },
  },
});

export const selectItemsVisible = (state) => state.loadMore.itemsVisible.value;
export const selectItemsVisible2 = (state) => state.loadMore.itemsVisible2;

export const { setItemsVisible, setItemsVisible2 } = loadMore.actions;
export default loadMore.reducer;
