import { createSlice } from "@reduxjs/toolkit";

const view = createSlice({
  name: "view",
  initialState: {
    view: { value: "rows" },
  },
  reducers: {
    setView({ view }, { payload }) {
      view.value = payload.value;
    },
  },
});

export const { setView } = view.actions;
export default view.reducer;