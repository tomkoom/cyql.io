import { createSlice } from "@reduxjs/toolkit";

const viewSlice = createSlice({
  name: "view",
  initialState: {
    view: { value: "rows" },
  },
  reducers: {
    setView(state, action) {
      state.view.value = action.payload.value;
    },
  },
});

export const { setView } = viewSlice.actions;
export default viewSlice.reducer;