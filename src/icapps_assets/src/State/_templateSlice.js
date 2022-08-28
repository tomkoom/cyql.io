import { createSlice } from "@reduxjs/toolkit";

const template = createSlice({
  name: "template",
  initialState: {
    key: "value",
  },
  reducers: {
    setKey(state, { payload }) {
      state.key = payload;
    },
  },
});

export const selectKey = (state) => state.template.key;

export const { setKey } = template.actions;
export default template.reducer;
