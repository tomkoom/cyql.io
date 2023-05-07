import { createSlice } from "@reduxjs/toolkit";

const loadMore = createSlice({
  name: "loadMore",
  initialState: {
    itemsVisible: { value: 36 },
    itemsVisibleNftHolders: 48,
    itemsVisibleProjects: 64,
  },
  reducers: {
    setItemsVisible({ itemsVisible }) {
      itemsVisible.value += 36;
    },
    setItemsVisibleNftHolders(state, { payload }) {
      state.itemsVisibleNftHolders += payload;
    },
    setItemsVisibleProjects(state, { payload }) {
      state.itemsVisibleProjects += payload;
    },
  },
});

const selectItemsVisible = (state) => state.loadMore.itemsVisible.value;
const selectItemsVisibleNftHolders = (state) => state.loadMore.itemsVisibleNftHolders;
const selectItemsVisibleProjects = (state) => state.loadMore.itemsVisibleProjects;
export { selectItemsVisible, selectItemsVisibleNftHolders, selectItemsVisibleProjects };

export const { setItemsVisible, setItemsVisibleNftHolders, setItemsVisibleProjects } = loadMore.actions;
export default loadMore.reducer;
