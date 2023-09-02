import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/state/_store";

interface LoadMoreState {
  itemsVisible: number;
  itemsVisibleProjects: number;
}

const initialState: LoadMoreState = {
  itemsVisible: 36,
  itemsVisibleProjects: 64,
};

const loadMore = createSlice({
  name: "loadMore",
  initialState,
  reducers: {
    setItemsVisible({ itemsVisible }) {
      itemsVisible += 36;
    },
    setItemsVisibleProjects(state, { payload }: PayloadAction<number>) {
      state.itemsVisibleProjects += payload;
    },
  },
});

export const selectItemsVisible = (state: RootState) => state.loadMore.itemsVisible;
export const selectItemsVisibleProjects = (state: RootState) => state.loadMore.itemsVisibleProjects;

export const { setItemsVisible, setItemsVisibleProjects } = loadMore.actions;
export default loadMore.reducer;
