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

const selectKey = (state) => state.template.key;
export { selectKey };

export const { setKey } = template.actions;
export default template.reducer;
