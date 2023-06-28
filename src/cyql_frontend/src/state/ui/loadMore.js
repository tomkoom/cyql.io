import { createSlice } from "@reduxjs/toolkit";

const loadMore = createSlice({
  name: "loadMore",
  initialState: {
    itemsVisible: { value: 36 },
    itemsVisibleProjects: 64,
  },
  reducers: {
    setItemsVisible({ itemsVisible }) {
      itemsVisible.value += 36;
    },
    setItemsVisibleProjects(state, { payload }) {
      state.itemsVisibleProjects += payload;
    },
  },
});

const selectItemsVisible = (state) => state.loadMore.itemsVisible.value;
const selectItemsVisibleProjects = (state) => state.loadMore.itemsVisibleProjects;
export { selectItemsVisible, selectItemsVisibleProjects };

export const { setItemsVisible, setItemsVisibleProjects } = loadMore.actions;
export default loadMore.reducer;
