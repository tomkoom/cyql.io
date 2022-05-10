import { createSlice } from "@reduxjs/toolkit";

const view = createSlice({
  name: "view",
  initialState: {
    view: { value: "grid" },
  },
  reducers: {
    setView({ view }, { payload }) {
      view.value = payload.value;
    },
  },
});

export const selectView = (state) => state.view.view.value;

export const { setView } = view.actions;
export default view.reducer;
