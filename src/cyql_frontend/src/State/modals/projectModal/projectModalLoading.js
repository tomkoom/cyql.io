import { createSlice } from "@reduxjs/toolkit";

const projectModalLoading = createSlice({
  name: "projectModalLoading",
  initialState: {
    add: false,
    edit: false,
    del: false,
  },
  reducers: {
    setProjectModalLoadingAdd(state, { payload }) {
      state.add = payload;
    },
    setProjectModalLoadingEdit(state, { payload }) {
      state.edit = payload;
    },
    setProjectModalLoadingDel(state, { payload }) {
      state.del = payload;
    },
  },
});

const selectProjectModalLoadingAdd = (state) => state.projectModalLoading.add;
const selectProjectModalLoadingEdit = (state) => state.projectModalLoading.edit;
const selectProjectModalLoadingDel = (state) => state.projectModalLoading.del;
export {
  selectProjectModalLoadingAdd,
  selectProjectModalLoadingEdit,
  selectProjectModalLoadingDel,
};

export const { setProjectModalLoadingAdd, setProjectModalLoadingEdit, setProjectModalLoadingDel } =
  projectModalLoading.actions;
export default projectModalLoading.reducer;
