import { createSlice } from "@reduxjs/toolkit";

const projectModalLoading = createSlice({
  name: "projectModalLoading",
  initialState: {
    set: false,
    del: false,
  },
  reducers: {
    setProjectModalLoadingSet(state, { payload }) {
      state.set = payload;
    },
    setProjectModalLoadingDel(state, { payload }) {
      state.del = payload;
    },
  },
});

const selectProjectModalLoadingSet = (state) => state.projectModalLoading.set;
const selectProjectModalLoadingDel = (state) => state.projectModalLoading.del;
export { selectProjectModalLoadingSet, selectProjectModalLoadingDel };

export const { setProjectModalLoadingSet, setProjectModalLoadingDel } = projectModalLoading.actions;
export default projectModalLoading.reducer;
