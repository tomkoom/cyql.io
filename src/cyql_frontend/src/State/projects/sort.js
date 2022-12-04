import { createSlice } from "@reduxjs/toolkit";

const sort = createSlice({
  name: "sort",
  initialState: {
    sort: "date",
    sortModal: false,
  },
  reducers: {
    setSort(state, { payload }) {
      state.sort = payload;
    },
    setSortModal(state, { payload }) {
      state.sortModal = payload;
    },
  },
});

const selectSort = (state) => state.sort.sort;
const selectSortModal = (state) => state.sort.sortModal;
export { selectSort, selectSortModal };

export const { setSort, setSortModal } = sort.actions;
export default sort.reducer;
